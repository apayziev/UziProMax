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

// Format date from YYYY-MM-DD to DD.MM.YYYY
const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return ""
  const parts = dateStr.split("-")
  if (parts.length === 3) {
    return `${parts[2]}.${parts[1]}.${parts[0]}`
  }
  return dateStr
}

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
              {examination.patient_name} • {formatDate(examination.examination_date)}
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
            <Link to="/examinations/edit/$id" params={{ id: String(examination.id) }}>
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
  const { t } = useLanguage()
  const templateInfo = TEMPLATE_TYPES[examination.template_type]
  const data = examination.examination_data || {}

  const renderAbdominal = () => (
    <div className="space-y-4">
      {/* Jigar */}
      <div>
        <h4 className="font-semibold">ПЕЧЕНЬ:</h4>
        <p>
          Контуры печени {data.liver_contour || "ровные, четкие"}.
          {" "}Звукопроводимость – сохранена.
        </p>
        <p>
          Размеры: Правая доля КВР {data.liver_kvr_right || "___"} мм (норма до 150-160 мм), 
          ПЗР {data.liver_pzr || "___"} мм (норма до 125 мм). 
          Левая доля КВР {data.liver_kvr_left || "___"} мм (норма до 100 мм).
        </p>
        <p>
          Эхоструктура {data.liver_echostructure || "однородная"}.
          {data.liver_echogenicity && ` Эхогенность ${data.liver_echogenicity}.`}
        </p>
        <p>
          Сосуды печени: V. portae – {data.portal_vein || "___"} мм (норма 7-14 мм).
          {" "}Нижняя полая вена (IVC) – {data.ivc || "___"} мм (норма 12-23 мм).
          {" "}Общий желчный проток (choledoch) – {data.choledoch || "___"} мм (норма до 6-8 мм).
        </p>
      </div>

      {/* O't pufagi */}
      <div>
        <h4 className="font-semibold">ЖЕЛЧНЫЙ ПУЗЫРЬ:</h4>
        <p>
          Размеры: {data.gallbladder_size || "___"} мм.
          {" "}Стенки толщиной {data.gallbladder_wall || "___"} мм (норма 1-2 мм).
          {" "}Содержимое {data.gallbladder_content || "гомогенное"}.
        </p>
      </div>

      {/* Oshqozon osti bezi */}
      <div>
        <h4 className="font-semibold">ПОДЖЕЛУДОЧНАЯ ЖЕЛЕЗА:</h4>
        <p>
          Контуры {data.pancreas_contour || "ровные, четкие"}.
          {" "}Размеры: головка {data.pancreas_head || "___"} мм (норма 11-32 мм), 
          тело {data.pancreas_body || "___"} мм (норма 4-21 мм), 
          хвост {data.pancreas_tail || "___"} мм (норма 7-35 мм).
          {data.pancreas_duct && ` Вирсунгов проток ${data.pancreas_duct} мм.`}
        </p>
        <p>
          Эхоструктура {data.pancreas_echostructure || "однородная"}.
        </p>
      </div>

      {/* Taloq */}
      <div>
        <h4 className="font-semibold">СЕЛЕЗЕНКА:</h4>
        <p>
          Размеры: {data.spleen_length || "___"} x {data.spleen_width || "___"} мм (норма до 125x50 мм).
          {" "}Контуры {data.spleen_contour || "ровные, четкие"}.
          {" "}Эхоструктура {data.spleen_echostructure || "однородная"}.
          {data.spleen_vein && ` Селезеночная вена ${data.spleen_vein} мм.`}
        </p>
      </div>

      {/* O'ng buyrak */}
      {(data.kidney_right_size || data.kidney_right_parenchyma) && (
        <div>
          <h4 className="font-semibold">ПРАВАЯ ПОЧКА:</h4>
          <p>
            Размеры: {data.kidney_right_size || "___"} мм.
            {data.kidney_right_parenchyma && ` Паренхима ${data.kidney_right_parenchyma} мм.`}
            {" "}Контуры {data.kidney_right_contour || "ровные, четкие"}.
            {data.kidney_right_pcs && ` ЧЛС: ${data.kidney_right_pcs}.`}
          </p>
        </div>
      )}

      {/* Chap buyrak */}
      {(data.kidney_left_size || data.kidney_left_parenchyma) && (
        <div>
          <h4 className="font-semibold">ЛЕВАЯ ПОЧКА:</h4>
          <p>
            Размеры: {data.kidney_left_size || "___"} мм.
            {data.kidney_left_parenchyma && ` Паренхима ${data.kidney_left_parenchyma} мм.`}
            {" "}Контуры {data.kidney_left_contour || "ровные, четкие"}.
            {data.kidney_left_pcs && ` ЧЛС: ${data.kidney_left_pcs}.`}
          </p>
        </div>
      )}

      {/* Qorin bo'shlig'ida suyuqlik */}
      {data.free_fluid && (
        <div>
          <p><span className="font-semibold">Свободная жидкость в брюшной полости: </span>{data.free_fluid}.</p>
        </div>
      )}
    </div>
  )

  const renderGynecology = () => (
    <div className="space-y-4">
      {/* So'nggi hayz */}
      {data.last_menstruation && (
        <div>
          <span className="font-semibold">День последней менструации: </span>
          {formatDate(data.last_menstruation)}
        </div>
      )}

      {/* Bachadon */}
      <div>
        <h4 className="font-semibold">МАТКА:</h4>
        <p>
          {data.uterus_position && `Положение: ${data.uterus_position}. `}
          Контуры: {data.uterus_contour || "ровные, чёткие"}, форма обычная.
        </p>
        <p>
          Размеры тела матки: длина {data.uterus_length || "___"} мм (N: 44,0-70,0), 
          толщина {data.uterus_thickness || "___"} мм (N: 33,0-46,0), 
          ширина {data.uterus_width || "___"} мм (N: 42,0-60,0).
        </p>
        <p>
          Структура миометрия: {data.myometrium_structure || "однородная"}.
          {data.uterine_cavity && ` Полость матки: ${data.uterine_cavity}.`}
        </p>
      </div>

      {/* Endometriy */}
      <div>
        <h4 className="font-semibold">ЭНДОМЕТРИЙ:</h4>
        <p>
          Толщина: {data.endometrium_thickness || "___"} мм.
          {data.endometrium_structure && ` Эхоструктура: ${data.endometrium_structure}.`}
          {data.menstrual_phase && ` Соответствует ${data.menstrual_phase} фазе МЦ.`}
          {" "}Границы чёткие, контуры ровные.
        </p>
      </div>

      {/* Bachadon bo'yni */}
      <div>
        <h4 className="font-semibold">ШЕЙКА МАТКИ:</h4>
        <p>
          {data.cervix_shape && `Форма: ${data.cervix_shape}. `}
          Длина: {data.cervix_length || "___"} мм
          {data.cervix_width && `, ширина: ${data.cervix_width} мм`}.
          {data.endocervix && ` Эндоцервикс: ${data.endocervix} мм (N: 2-8 мм).`}
          {" "}Контуры ровные, чёткие.
        </p>
      </div>

      {/* O'ng tuxumdon */}
      <div>
        <h4 className="font-semibold">ПРАВЫЙ ЯИЧНИК:</h4>
        <p>
          В типичном месте. Размеры: {data.ovary_right_size || "___"} мм.
          {data.ovary_right_volume && ` Объём: ${data.ovary_right_volume} мл.`}
          {" "}Контуры ровные, чёткие.
        </p>
        <p>
          {data.ovary_right_follicles && `Фолликулы: ${data.ovary_right_follicles}.`}
          {data.ovary_right_max_follicle && ` Максимальный фолликул: Ø ${data.ovary_right_max_follicle} мм.`}
          {data.ovary_right_mass && ` Образование: ${data.ovary_right_mass}.`}
        </p>
      </div>

      {/* Chap tuxumdon */}
      <div>
        <h4 className="font-semibold">ЛЕВЫЙ ЯИЧНИК:</h4>
        <p>
          В типичном месте. Размеры: {data.ovary_left_size || "___"} мм.
          {data.ovary_left_volume && ` Объём: ${data.ovary_left_volume} мл.`}
          {" "}Контуры ровные, чёткие.
        </p>
        <p>
          {data.ovary_left_follicles && `Фолликулы: ${data.ovary_left_follicles}.`}
          {data.ovary_left_max_follicle && ` Максимальный фолликул: Ø ${data.ovary_left_max_follicle} мм.`}
          {data.ovary_left_mass && ` Образование: ${data.ovary_left_mass}.`}
        </p>
      </div>

      {/* Bachadon naychalari */}
      <div>
        <p><span className="font-semibold">Маточные трубы: </span>{data.fallopian_tubes || "не визуализируются"} (в норме не виз-ся).</p>
      </div>

      {/* Kichik tos */}
      <div>
        <p><span className="font-semibold">Жидкость в полости малого таза: </span>{data.fluid_in_pelvis || "не визуализируется"}.</p>
        <p><span className="font-semibold">Вены малого таза: </span>{data.pelvic_veins || "не расширены"}.</p>
      </div>

      {/* Mioma tugunlari */}
      {(data.myoma_count || data.myoma_sizes) && (
        <div>
          <h4 className="font-semibold">МИОМАТОЗНЫЕ УЗЛЫ:</h4>
          <p>
            {data.myoma_count && `Количество: ${data.myoma_count} шт. `}
            {data.myoma_location && `Локализация: ${data.myoma_location}. `}
            {data.myoma_sizes && `Размеры: ${data.myoma_sizes}. `}
            {data.myoma_figo && `Тип по FIGO: ${data.myoma_figo}.`}
          </p>
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
    <div className={forPrint ? "p-8 text-sm leading-relaxed" : ""}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <img src="/assets/images/favicon.png" alt="UziProMax" className="h-16 w-auto print:h-12" />
        </div>
        <h2 className="text-xl font-bold uppercase">ПРОТОКОЛ УЗИ</h2>
        <p className="text-lg font-semibold mt-1">{templateInfo?.name_ru || examination.template_type}</p>
        <div className="mt-2 text-xs text-muted-foreground">
          <p>{t("phone")}: +998 77 082 66 22 | {t("address")}: {t("clinic_address")}</p>
        </div>
      </div>

      {/* Bemor ma'lumotlari */}
      <div className="mb-4 p-3 border rounded bg-muted/30 print:bg-transparent print:border-0">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-semibold">ФИО: </span>
            {examination.patient_name || "___"}
          </div>
          <div>
            <span className="font-semibold">Дата исследования: </span>
            {formatDate(examination.examination_date)}
          </div>
          {data.last_menstruation && (
            <div className="col-span-2">
              <span className="font-semibold">День последней менструации: </span>
              {formatDate(data.last_menstruation)}
            </div>
          )}
        </div>
      </div>

      <Separator className="my-4 print:my-2" />

      {/* Tekshiruv ma'lumotlari */}
      <div className="text-sm leading-relaxed">
        {renderExaminationData()}
      </div>

      {/* Xulosa */}
      {examination.conclusion && (
        <>
          <Separator className="my-4 print:my-2" />
          <div>
            <h4 className="font-bold uppercase">ЗАКЛЮЧЕНИЕ:</h4>
            <p className="mt-2 whitespace-pre-wrap">{examination.conclusion}</p>
          </div>
        </>
      )}

      {/* Tavsiyalar */}
      {examination.recommendations && (
        <div className="mt-4">
          <h4 className="font-bold uppercase">РЕКОМЕНДАЦИИ:</h4>
          <p className="mt-2 whitespace-pre-wrap">{examination.recommendations}</p>
        </div>
      )}
    </div>
  )
}
