import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/hooks/useLanguage"
import { TEMPLATE_TYPES, type Examination } from "@/types/medical"

// Format date from YYYY-MM-DD to DD.MM.YYYY
export const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return ""
  const parts = dateStr.split("-")
  if (parts.length === 3) {
    return `${parts[2]}.${parts[1]}.${parts[0]}`
  }
  return dateStr
}

interface PrintHeaderProps {
  examination: Examination
}

export function PrintHeader({ examination }: PrintHeaderProps) {
  const { t } = useLanguage()
  const templateInfo = TEMPLATE_TYPES[examination.template_type]

  return (
    <div className="text-center mb-4 print:mb-3">
      <div className="flex justify-center mb-1">
        <img src={`${import.meta.env.BASE_URL || "/"}assets/images/favicon.png`} alt="UziProMax" className="h-14 w-auto print:h-10" />
      </div>
      <h2 className="text-lg font-bold uppercase print:text-base">ПРОТОКОЛ УЗИ</h2>
      <p className="text-base font-semibold print:text-sm">{templateInfo?.name_ru || examination.template_type}</p>
      <div className="mt-1 text-xs text-muted-foreground">
        <p>Тел: +998 77 082 66 22 | {t("clinic_address")}</p>
      </div>
    </div>
  )
}

interface PatientInfoProps {
  examination: Examination
}

export function PatientInfo({ examination }: PatientInfoProps) {
  const data = examination.examination_data || {}

  return (
    <div className="mb-3 p-2 border rounded bg-muted/30 print:bg-transparent print:border-0 print:p-0 print:mb-2">
      <div className="grid grid-cols-2 gap-1 text-sm">
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
  )
}

interface ConclusionSectionProps {
  examination: Examination
}

export function ConclusionSection({ examination }: ConclusionSectionProps) {
  if (!examination.conclusion && !examination.recommendations) return null

  return (
    <>
      {examination.conclusion && (
        <>
          <Separator className="my-3 print:my-2" />
          <div>
            <h4 className="font-bold text-primary">ЗАКЛЮЧЕНИЕ:</h4>
            <p className="mt-1 whitespace-pre-wrap">{examination.conclusion}</p>
          </div>
        </>
      )}

      {examination.recommendations && (
        <div className="mt-3">
          <h4 className="font-bold text-primary">РЕКОМЕНДАЦИИ:</h4>
          <p className="mt-1 whitespace-pre-wrap">{examination.recommendations}</p>
        </div>
      )}
    </>
  )
}

interface PrintFooterProps {
  examination: Examination
}

export function PrintFooter({ examination }: PrintFooterProps) {
  return (
    <div className="mt-6 pt-4 border-t text-sm print:mt-auto">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-muted-foreground text-xs italic">
            Заключение УЗИ не является диагнозом. Проконсультируйтесь со специалистом.
          </p>
        </div>
        <div className="text-right">
          <p className="font-semibold">Врач УЗД: {examination.doctor_name || "_____________________"}</p>
        </div>
      </div>
    </div>
  )
}

// Umumiy data turi
export type ExaminationData = Record<string, string | number | boolean | null | undefined>
