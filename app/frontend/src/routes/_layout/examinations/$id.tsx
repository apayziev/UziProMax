import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ArrowLeft, Printer, Edit, CheckCircle } from "lucide-react"
import { Link } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/useLanguage"

import { TEMPLATE_TYPES, type Examination } from "@/types/medical"

export const Route = createFileRoute("/_layout/examinations/$id")({
  component: ExaminationDetailPage,
})

async function getExamination(id: number): Promise<Examination> {
  const response = await fetch(`/api/v1/examinations/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  })
  if (!response.ok) throw new Error("Failed to fetch examination")
  return response.json()
}

async function updateExaminationStatus(id: number, status: string) {
  const response = await fetch(`/api/v1/examinations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({ status }),
  })
  if (!response.ok) throw new Error("Failed to update status")
  return response.json()
}

function ExaminationDetailPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { t, language } = useLanguage()

  const { data: examination, isLoading } = useQuery({
    queryKey: ["examination", id],
    queryFn: () => getExamination(Number(id)),
  })

  const statusMutation = useMutation({
    mutationFn: (status: string) => updateExaminationStatus(Number(id), status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examination", id] })
      toast({ title: t("success"), description: t("status_updated") })
    },
  })

  const handlePrint = () => {
    // Mark as printed first
    if (examination?.status !== "printed") {
      statusMutation.mutate("printed")
    }
    // Open print dialog
    window.print()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-muted-foreground">{t("loading")}</div>
      </div>
    )
  }

  if (!examination) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-destructive">{t("examination_not_found")}</div>
      </div>
    )
  }

  const templateInfo = TEMPLATE_TYPES[examination.template_type]

  const statusColors = {
    draft: "secondary",
    completed: "default",
    printed: "outline",
  } as const

  const statusLabels = {
    draft: t("draft"),
    completed: t("completed"),
    printed: t("printed"),
  }

  return (
    <>
      {/* Screen version */}
      <div className="space-y-6 print:hidden">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/examinations">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {templateInfo?.name_ru || examination.template_type}
            </h1>
            <p className="text-muted-foreground">
              {examination.patient_name} • {examination.examination_date}
            </p>
          </div>
          <Badge variant={statusColors[examination.status as keyof typeof statusColors]}>
            {statusLabels[examination.status as keyof typeof statusLabels]}
          </Badge>
          <div className="flex gap-2">
            {examination.status === "draft" && (
              <Button
                variant="outline"
                onClick={() => statusMutation.mutate("completed")}
                disabled={statusMutation.isPending}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {t("ready")}
              </Button>
            )}
            <Link to={`/examinations/edit/${examination.id}`}>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                {t("edit")}
              </Button>
            </Link>
            <Button onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              {t("print")}
            </Button>
          </div>
        </div>

        {/* Content preview */}
        <Card>
          <CardHeader>
            <CardTitle>{t("examination_results")}</CardTitle>
          </CardHeader>
          <CardContent>
            <PrintContent examination={examination} />
          </CardContent>
        </Card>
      </div>

      {/* Print version */}
      <div className="hidden print:block">
        <PrintContent examination={examination} forPrint />
      </div>
    </>
  )
}

interface PrintContentProps {
  examination: Examination
  forPrint?: boolean
}

function PrintContent({ examination, forPrint = false }: PrintContentProps) {
  const templateInfo = TEMPLATE_TYPES[examination.template_type]
  const data = examination.examination_data || {}

  const renderAbdominal = () => (
    <div className="space-y-4">
      {/* Jigar */}
      {(data.liver_right_lobe || data.liver_left_lobe) && (
        <div>
          <h4 className="font-semibold">ПЕЧЕНЬ:</h4>
          <p>
            Правая доля {data.liver_right_lobe} мм, левая доля {data.liver_left_lobe} мм.
            {data.liver_contours && ` Контуры ${data.liver_contours}.`}
            {data.liver_echogenicity && ` Эхогенность ${data.liver_echogenicity}.`}
            {data.liver_structure && ` Структура ${data.liver_structure}.`}
          </p>
        </div>
      )}

      {/* O't pufagi */}
      {(data.gallbladder_length || data.gallbladder_width) && (
        <div>
          <h4 className="font-semibold">ЖЕЛЧНЫЙ ПУЗЫРЬ:</h4>
          <p>
            Размеры: {data.gallbladder_length} x {data.gallbladder_width} мм.
            {data.gallbladder_wall && ` Стенка ${data.gallbladder_wall} мм.`}
            {data.gallbladder_contents && ` Содержимое: ${data.gallbladder_contents}.`}
            {data.gallbladder_stones === "есть" && ` Конкременты: ${data.gallbladder_stone_size} мм.`}
          </p>
        </div>
      )}

      {/* Me'da osti bezi */}
      {(data.pancreas_head || data.pancreas_body || data.pancreas_tail) && (
        <div>
          <h4 className="font-semibold">ПОДЖЕЛУДОЧНАЯ ЖЕЛЕЗА:</h4>
          <p>
            Головка {data.pancreas_head} мм, тело {data.pancreas_body} мм, хвост {data.pancreas_tail} мм.
            {data.pancreas_contours && ` Контуры ${data.pancreas_contours}.`}
            {data.pancreas_echogenicity && ` Эхогенность ${data.pancreas_echogenicity}.`}
            {data.pancreas_structure && ` Структура ${data.pancreas_structure}.`}
            {data.virsung_duct && ` Вирсунгов проток ${data.virsung_duct} мм.`}
          </p>
        </div>
      )}

      {/* Taloq */}
      {(data.spleen_length || data.spleen_width) && (
        <div>
          <h4 className="font-semibold">СЕЛЕЗЕНКА:</h4>
          <p>
            Размеры: {data.spleen_length} x {data.spleen_width} мм.
            {data.spleen_contours && ` Контуры ${data.spleen_contours}.`}
            {data.spleen_structure && ` Структура ${data.spleen_structure}.`}
            {data.spleen_vein && ` Селезеночная вена ${data.spleen_vein} мм.`}
          </p>
        </div>
      )}

      {/* O'ng buyrak */}
      {(data.right_kidney_length || data.right_kidney_width) && (
        <div>
          <h4 className="font-semibold">ПРАВАЯ ПОЧКА:</h4>
          <p>
            Размеры: {data.right_kidney_length} x {data.right_kidney_width} мм.
            {data.right_kidney_parenchyma && ` Паренхима ${data.right_kidney_parenchyma} мм.`}
            {data.right_kidney_contours && ` Контуры ${data.right_kidney_contours}.`}
            {data.right_kidney_pcs && ` ЧЛС ${data.right_kidney_pcs}.`}
          </p>
        </div>
      )}

      {/* Chap buyrak */}
      {(data.left_kidney_length || data.left_kidney_width) && (
        <div>
          <h4 className="font-semibold">ЛЕВАЯ ПОЧКА:</h4>
          <p>
            Размеры: {data.left_kidney_length} x {data.left_kidney_width} мм.
            {data.left_kidney_parenchyma && ` Паренхима ${data.left_kidney_parenchyma} мм.`}
            {data.left_kidney_contours && ` Контуры ${data.left_kidney_contours}.`}
            {data.left_kidney_pcs && ` ЧЛС ${data.left_kidney_pcs}.`}
          </p>
        </div>
      )}

      {/* Qorin bo'shlig'ida suyuqlik */}
      {data.free_fluid && (
        <div>
          <h4 className="font-semibold">СВОБОДНАЯ ЖИДКОСТЬ:</h4>
          <p>{data.free_fluid}</p>
        </div>
      )}
    </div>
  )

  const renderGynecology = () => (
    <div className="space-y-4">
      {/* Bachadon */}
      {(data.uterus_length || data.uterus_width || data.uterus_ap) && (
        <div>
          <h4 className="font-semibold">МАТКА:</h4>
          <p>
            {data.uterus_position && `Положение: ${data.uterus_position}. `}
            Размеры: {data.uterus_length} x {data.uterus_width} x {data.uterus_ap} мм.
            {data.uterus_contours && ` Контуры ${data.uterus_contours}.`}
            {data.uterus_structure && ` Структура ${data.uterus_structure}.`}
          </p>
        </div>
      )}

      {/* Endometriy */}
      {data.endometrium_thickness && (
        <div>
          <h4 className="font-semibold">ЭНДОМЕТРИЙ:</h4>
          <p>
            Толщина {data.endometrium_thickness} мм.
            {data.endometrium_structure && ` Структура ${data.endometrium_structure}.`}
            {data.cavity && ` Полость матки ${data.cavity}.`}
          </p>
        </div>
      )}

      {/* Bachadon bo'yni */}
      {data.cervix_length && (
        <div>
          <h4 className="font-semibold">ШЕЙКА МАТКИ:</h4>
          <p>
            Длина {data.cervix_length} мм.
            {data.cervical_canal && ` Цервикальный канал ${data.cervical_canal} мм.`}
            {data.nabothian_cysts && ` Наботовы кисты: ${data.nabothian_cysts}.`}
          </p>
        </div>
      )}

      {/* O'ng tuxumdon */}
      {(data.right_ovary_length || data.right_ovary_width) && (
        <div>
          <h4 className="font-semibold">ПРАВЫЙ ЯИЧНИК:</h4>
          <p>
            Размеры: {data.right_ovary_length} x {data.right_ovary_width} x {data.right_ovary_ap} мм.
            {data.right_ovary_volume && ` Объем ${data.right_ovary_volume} мл.`}
            {data.right_follicles && ` Фолликулы: ${data.right_follicles}.`}
          </p>
        </div>
      )}

      {/* Chap tuxumdon */}
      {(data.left_ovary_length || data.left_ovary_width) && (
        <div>
          <h4 className="font-semibold">ЛЕВЫЙ ЯИЧНИК:</h4>
          <p>
            Размеры: {data.left_ovary_length} x {data.left_ovary_width} x {data.left_ovary_ap} мм.
            {data.left_ovary_volume && ` Объем ${data.left_ovary_volume} мл.`}
            {data.left_follicles && ` Фолликулы: ${data.left_follicles}.`}
          </p>
        </div>
      )}

      {/* Duglas bo'shlig'i */}
      {data.douglas && (
        <div>
          <h4 className="font-semibold">ПОЗАДИМАТОЧНОЕ ПРОСТРАНСТВО:</h4>
          <p>{data.douglas}</p>
        </div>
      )}
    </div>
  )

  const renderObstetrics = () => (
    <div className="space-y-4">
      {/* Homiladorlik ma'lumotlari */}
      <div>
        <h4 className="font-semibold">БЕРЕМЕННОСТЬ:</h4>
        <p>
          {data.gestational_weeks && `Срок: ${data.gestational_weeks} нед ${data.gestational_days || 0} дн. `}
          {data.fetus_count && `Количество плодов: ${data.fetus_count}. `}
          {data.presentation && `Предлежание: ${data.presentation}.`}
        </p>
      </div>

      {/* Fetometriya */}
      <div>
        <h4 className="font-semibold">ФЕТОМЕТРИЯ:</h4>
        <p>
          {data.crl && `КТР: ${data.crl} мм. `}
          {data.nt && `ТВП: ${data.nt} мм. `}
          {data.bpd && `БПР: ${data.bpd} мм. `}
          {data.ofd && `ЛЗР: ${data.ofd} мм. `}
          {data.hc && `ОГ: ${data.hc} мм. `}
          {data.ac && `ОЖ: ${data.ac} мм. `}
          {data.fl && `ДБК: ${data.fl} мм. `}
          {data.hl && `ДПК: ${data.hl} мм. `}
          {data.fhr && `ЧСС: ${data.fhr} уд/мин. `}
          {data.fetal_weight && `Масса плода: ${data.fetal_weight} г.`}
        </p>
      </div>

      {/* Platsenta */}
      {data.placenta_location && (
        <div>
          <h4 className="font-semibold">ПЛАЦЕНТА:</h4>
          <p>
            Расположение: {data.placenta_location}.
            {data.placenta_thickness && ` Толщина: ${data.placenta_thickness} мм.`}
            {data.placenta_grade && ` Степень зрелости: ${data.placenta_grade}.`}
            {data.placenta_structure && ` Структура: ${data.placenta_structure}.`}
          </p>
        </div>
      )}

      {/* Amniotik suyuqlik */}
      {data.amniotic_fluid && (
        <div>
          <h4 className="font-semibold">ОКОЛОПЛОДНЫЕ ВОДЫ:</h4>
          <p>
            {data.amniotic_fluid}.
            {data.afi && ` ИАЖ: ${data.afi} мм.`}
          </p>
        </div>
      )}

      {/* Bachadon bo'yni */}
      {data.cervix_length && (
        <div>
          <h4 className="font-semibold">ШЕЙКА МАТКИ:</h4>
          <p>
            Длина: {data.cervix_length} мм.
            {data.internal_os && ` Внутренний зев: ${data.internal_os}.`}
          </p>
        </div>
      )}
    </div>
  )

  const renderBreast = () => (
    <div className="space-y-4">
      {/* O'ng sut bezi */}
      {data.right_thickness && (
        <div>
          <h4 className="font-semibold">ПРАВАЯ МОЛОЧНАЯ ЖЕЛЕЗА:</h4>
          <p>
            Толщина: {data.right_thickness} мм.
            {data.right_structure && ` Тип строения: ${data.right_structure}.`}
            {data.right_ducts && ` Протоки: ${data.right_ducts}.`}
            {data.right_lesions === "есть" && ` Образование: ${data.right_lesion_size}, ${data.right_lesion_type}, контуры ${data.right_lesion_margins}.`}
            {data.right_birads && ` BI-RADS ${data.right_birads}.`}
          </p>
        </div>
      )}

      {/* Chap sut bezi */}
      {data.left_thickness && (
        <div>
          <h4 className="font-semibold">ЛЕВАЯ МОЛОЧНАЯ ЖЕЛЕЗА:</h4>
          <p>
            Толщина: {data.left_thickness} мм.
            {data.left_structure && ` Тип строения: ${data.left_structure}.`}
            {data.left_ducts && ` Протоки: ${data.left_ducts}.`}
            {data.left_lesions === "есть" && ` Образование: ${data.left_lesion_size}, ${data.left_lesion_type}, контуры ${data.left_lesion_margins}.`}
            {data.left_birads && ` BI-RADS ${data.left_birads}.`}
          </p>
        </div>
      )}

      {/* Limfa tugunlari */}
      {(data.right_axillary_ln || data.left_axillary_ln) && (
        <div>
          <h4 className="font-semibold">РЕГИОНАРНЫЕ ЛИМФОУЗЛЫ:</h4>
          <p>
            {data.right_axillary_ln && `Справа: ${data.right_axillary_ln}. `}
            {data.left_axillary_ln && `Слева: ${data.left_axillary_ln}.`}
          </p>
        </div>
      )}
    </div>
  )

  const renderThyroid = () => (
    <div className="space-y-4">
      {/* O'ng bo'lak */}
      {data.right_length && (
        <div>
          <h4 className="font-semibold">ПРАВАЯ ДОЛЯ:</h4>
          <p>
            Размеры: {data.right_length} x {data.right_width} x {data.right_thickness} мм.
            {data.right_contours && ` Контуры: ${data.right_contours}.`}
            {data.right_echogenicity && ` Эхогенность: ${data.right_echogenicity}.`}
            {data.right_structure && ` Структура: ${data.right_structure}.`}
            {data.right_nodules === "есть" && ` Узлы: ${data.right_nodule_size}, ${data.right_nodule_echo}.`}
          </p>
        </div>
      )}

      {/* Chap bo'lak */}
      {data.left_length && (
        <div>
          <h4 className="font-semibold">ЛЕВАЯ ДОЛЯ:</h4>
          <p>
            Размеры: {data.left_length} x {data.left_width} x {data.left_thickness} мм.
            {data.left_contours && ` Контуры: ${data.left_contours}.`}
            {data.left_echogenicity && ` Эхогенность: ${data.left_echogenicity}.`}
            {data.left_structure && ` Структура: ${data.left_structure}.`}
            {data.left_nodules === "есть" && ` Узлы: ${data.left_nodule_size}, ${data.left_nodule_echo}.`}
          </p>
        </div>
      )}

      {/* Pereshek */}
      {data.isthmus_thickness && (
        <div>
          <h4 className="font-semibold">ПЕРЕШЕЕК:</h4>
          <p>
            Толщина: {data.isthmus_thickness} мм.
            {data.isthmus_structure && ` Структура: ${data.isthmus_structure}.`}
          </p>
        </div>
      )}

      {/* Umumiy ma'lumotlar */}
      <div>
        <p>
          {data.lymph_nodes && `Регионарные лимфоузлы: ${data.lymph_nodes}. `}
          {data.blood_flow && `Кровоток (ЦДК): ${data.blood_flow}. `}
          {data.tirads && `TI-RADS: ${data.tirads}.`}
        </p>
      </div>
    </div>
  )

  const renderExaminationData = () => {
    const category = templateInfo?.category
    switch (category) {
      case "abdominal":
        return renderAbdominal()
      case "gynecology":
        return renderGynecology()
      case "obstetrics":
        return renderObstetrics()
      case "breast":
        return renderBreast()
      case "thyroid":
        return renderThyroid()
      default:
        return <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
    }
  }

  return (
    <div className={forPrint ? "p-8 text-sm" : ""}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <img src="/assets/images/favicon.png" alt="UziProMax" className="h-20 w-auto" />
        </div>
        <h2 className="text-xl font-bold">УЗИ ТЕКШИРУВИ</h2>
        <p className="text-lg font-semibold mt-2">{templateInfo?.name_ru || examination.template_type}</p>
      </div>

      {/* Bemor ma'lumotlari */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">ФИО: </span>
            {examination.patient_name}
          </div>
          <div>
            <span className="font-semibold">Дата: </span>
            {examination.examination_date}
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Tekshiruv ma'lumotlari */}
      {renderExaminationData()}

      {/* Xulosa */}
      {examination.conclusion && (
        <>
          <Separator className="my-4" />
          <div>
            <h4 className="font-bold">ЗАКЛЮЧЕНИЕ:</h4>
            <p className="mt-2 whitespace-pre-wrap">{examination.conclusion}</p>
          </div>
        </>
      )}

      {/* Tavsiyalar */}
      {examination.recommendations && (
        <div className="mt-4">
          <h4 className="font-bold">РЕКОМЕНДАЦИИ:</h4>
          <p className="mt-2 whitespace-pre-wrap">{examination.recommendations}</p>
        </div>
      )}

      {/* Imzo */}
      <div className="mt-8 text-right">
        <p>Врач УЗИ: ___________________</p>
        <p className="mt-1 text-sm text-muted-foreground">{examination.doctor_name}</p>
      </div>
    </div>
  )
}
