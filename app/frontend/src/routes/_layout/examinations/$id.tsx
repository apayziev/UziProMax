import { createFileRoute } from "@tanstack/react-router"
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
import {
  PrintHeader,
  PatientInfo,
  ConclusionSection,
  PrintFooter,
  formatDate,
  GynecologyPrint,
  AbdominalPrint,
  ObstetricsPrint,
  BreastPrint,
  ThyroidPrint,
} from "@/components/PrintTemplates"

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
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { t } = useLanguage()

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
    if (examination?.status !== "printed") {
      statusMutation.mutate("printed")
    }
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
  const templateInfo = TEMPLATE_TYPES[examination.template_type]
  const data = examination.examination_data || {}

  const renderExaminationData = () => {
    const category = templateInfo?.category
    switch (category) {
      case "abdominal":
        return <AbdominalPrint data={data} />
      case "gynecology":
        return <GynecologyPrint data={data} />
      case "obstetrics":
        return <ObstetricsPrint data={data} />
      case "breast":
        return <BreastPrint data={data} />
      case "thyroid":
        return <ThyroidPrint data={data} />
      default:
        return <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
    }
  }

  return (
    <div className={forPrint ? "p-4 pt-2 text-sm leading-relaxed print:p-2 print:pt-0 min-h-[calc(100vh-2cm)] flex flex-col" : ""}>
      <PrintHeader examination={examination} />
      <PatientInfo examination={examination} />
      
      <Separator className="my-4 print:my-2" />

      {/* Tekshiruv ma'lumotlari */}
      <div className="text-sm leading-relaxed">
        {renderExaminationData()}
      </div>

      <ConclusionSection examination={examination} />

      {/* Spacer - footer'ni pastga itarish uchun */}
      <div className="flex-grow" />

      <PrintFooter examination={examination} />
    </div>
  )
}
