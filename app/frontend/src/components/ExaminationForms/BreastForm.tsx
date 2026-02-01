/**
 * Sut bezlari UZI formasi - Молочные железы
 * DRY + Accordion (yig'iladigan bo'limlar)
 */
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { getBreastTranslations, type Language } from "./translations"

interface BreastFormProps {
  data: Record<string, any>
  onChange: (data: Record<string, any>) => void
  language?: Language
}

export function BreastForm({ data, onChange, language = "ru" }: BreastFormProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const t = getBreastTranslations(language)

  return (
    <div className="space-y-4">
      {/* UMUMIY MA'LUMOTLAR - har doim ko'rinadi */}
      <div className="p-4 border rounded-lg bg-muted/30">
        <h3 className="text-base font-semibold mb-3">{t.generalData}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="space-y-2">
            <Label>{t.complaints}</Label>
            <Select value={data.complaints || ""} onValueChange={(v) => updateField("complaints", v)}>
              <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="нет">{t.none}</SelectItem>
                <SelectItem value="боль">{t.pain}</SelectItem>
                <SelectItem value="уплотнение">{t.lump}</SelectItem>
                <SelectItem value="выделения">{t.discharge}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t.cycleDay}</Label>
            <Input type="number" placeholder="1-30" value={data.cycle_day || ""} onChange={(e) => updateField("cycle_day", e.target.value)} />
          </div>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["right_breast"]} className="space-y-2">
        {/* O'NG SUT BEZI */}
        <AccordionItem value="right_breast" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.rightBreast}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{t.thickness} ({t.mm})</Label>
                <Input type="number" value={data.right_thickness || ""} onChange={(e) => updateField("right_thickness", e.target.value)} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>{t.structure}</Label>
                <Select value={data.right_structure || ""}} onValueChange={(v) => updateField("right_structure", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="железистый">{t.glandular}</SelectItem>
                    <SelectItem value="смешанный">{t.mixed}</SelectItem>
                    <SelectItem value="жировой">{t.fatty}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>{t.echogenicity}</Label>
                <Select value={data.right_echogenicity || ""}} onValueChange={(v) => updateField("right_echogenicity", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="обычная">{t.normal}</SelectItem>
                    <SelectItem value="повышена">{t.increased}</SelectItem>
                    <SelectItem value="понижена">{t.decreased}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>{t.ducts}</Label>
                <Select value={data.right_ducts || ""}} onValueChange={(v) => updateField("right_ducts", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не расширены">{t.notDilated}</SelectItem>
                    <SelectItem value="расширены">{t.dilated}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>{t.lesions}</Label>
                <Select value={data.right_lesions || ""}} onValueChange={(v) => updateField("right_lesions", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="нет">{t.none}</SelectItem>
                    <SelectItem value="есть">{t.yes}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {data.right_lesions === "есть" && (
                <>
                  <div className="space-y-2">
                    <Label>{t.localization}</Label>
                    <Input placeholder={t.atOclock} value={data.right_lesion_location || ""} onChange={(e) => updateField("right_lesion_location", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.lesionSize} ({t.mm})</Label>
                    <Input placeholder={t.lengthWidth} value={data.right_lesion_size || ""} onChange={(e) => updateField("right_lesion_size", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.lesionType}</Label>
                    <Select value={data.right_lesion_type || ""} onValueChange={(v) => updateField("right_lesion_type", v)}>
                      <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="анэхогенное">{t.anechoicCyst}</SelectItem>
                        <SelectItem value="гипоэхогенное">{t.hypoechoic}</SelectItem>
                        <SelectItem value="изоэхогенное">{t.isoechoic}</SelectItem>
                        <SelectItem value="гиперэхогенное">{t.hyperechoic}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t.contours}</Label>
                    <Select value={data.right_lesion_margins || ""} onValueChange={(v) => updateField("right_lesion_margins", v)}>
                      <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ровные">{t.smoothOnly}</SelectItem>
                        <SelectItem value="неровные">{t.uneven}</SelectItem>
                        <SelectItem value="нечеткие">{t.unclear}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* CHAP SUT BEZI */}
        <AccordionItem value="left_breast" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.leftBreast}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              <div className="space-y-2">
                <Label>{t.thickness} ({t.mm})</Label>
                <Input type="number" value={data.left_thickness || ""}} onChange={(e) => updateField("left_thickness", e.target.value)} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>{t.structure}</Label>
                <Select value={data.left_structure || ""}} onValueChange={(v) => updateField("left_structure", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="железистый">{t.glandular}</SelectItem>
                    <SelectItem value="смешанный">{t.mixed}</SelectItem>
                    <SelectItem value="жировой">{t.fatty}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>{t.echogenicity}</Label>
                <Select value={data.left_echogenicity || ""}} onValueChange={(v) => updateField("left_echogenicity", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="обычная">{t.normal}</SelectItem>
                    <SelectItem value="повышена">{t.increased}</SelectItem>
                    <SelectItem value="понижена">{t.decreased}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>{t.ducts}</Label>
                <Select value={data.left_ducts || ""} onValueChange={(v) => updateField("left_ducts", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не расширены">{t.notDilated}</SelectItem>
                    <SelectItem value="расширены">{t.dilated}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>{t.lesions}</Label>
                <Select value={data.left_lesions || ""} onValueChange={(v) => updateField("left_lesions", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="нет">{t.none}</SelectItem>
                    <SelectItem value="есть">{t.yes}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {data.left_lesions === "есть" && (
                <>
                  <div className="space-y-2">
                    <Label>{t.localization}</Label>
                    <Input placeholder={t.atOclock} value={data.left_lesion_location || ""} onChange={(e) => updateField("left_lesion_location", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.lesionSize} ({t.mm})</Label>
                    <Input placeholder={t.lengthWidth} value={data.left_lesion_size || ""} onChange={(e) => updateField("left_lesion_size", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.lesionType}</Label>
                    <Select value={data.left_lesion_type || ""} onValueChange={(v) => updateField("left_lesion_type", v)}>
                      <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="анэхогенное">{t.anechoicCyst}</SelectItem>
                        <SelectItem value="гипоэхогенное">{t.hypoechoic}</SelectItem>
                        <SelectItem value="изоэхогенное">{t.isoechoic}</SelectItem>
                        <SelectItem value="гиперэхогенное">{t.hyperechoic}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t.contours}</Label>
                    <Select value={data.left_lesion_margins || ""} onValueChange={(v) => updateField("left_lesion_margins", v)}>
                      <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ровные">{t.smoothOnly}</SelectItem>
                        <SelectItem value="неровные">{t.uneven}</SelectItem>
                        <SelectItem value="нечеткие">{t.unclear}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* LIMFA TUGUNLARI */}
        <AccordionItem value="lymph_nodes" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.regionalLymphNodes}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t.axillaryRight}</Label>
                <Select value={data.right_axillary_ln || ""} onValueChange={(v) => updateField("right_axillary_ln", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не увеличены">{t.notEnlarged}</SelectItem>
                    <SelectItem value="увеличены">{t.enlarged}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.axillaryLeft}</Label>
                <Select value={data.left_axillary_ln || ""} onValueChange={(v) => updateField("left_axillary_ln", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не увеличены">{t.notEnlarged}</SelectItem>
                    <SelectItem value="увеличены">{t.enlarged}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* BI-RADS */}
        <AccordionItem value="birads" className="border rounded-lg px-4 border-purple-200 bg-purple-50/50">
          <AccordionTrigger className="text-base font-semibold hover:no-underline text-purple-700">
            {t.birads}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t.rightBreast}</Label>
                <Select value={data.right_birads || ""} onValueChange={(v) => updateField("right_birads", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">{t.birads0}</SelectItem>
                    <SelectItem value="1">{t.birads1}</SelectItem>
                    <SelectItem value="2">{t.birads2}</SelectItem>
                    <SelectItem value="3">{t.birads3}</SelectItem>
                    <SelectItem value="4">{t.birads4}</SelectItem>
                    <SelectItem value="5">{t.birads5}</SelectItem>
                    <SelectItem value="6">{t.birads6}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.leftBreast}</Label>
                <Select value={data.left_birads || ""} onValueChange={(v) => updateField("left_birads", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">{t.birads0}</SelectItem>
                    <SelectItem value="1">{t.birads1}</SelectItem>
                    <SelectItem value="2">{t.birads2}</SelectItem>
                    <SelectItem value="3">{t.birads3}</SelectItem>
                    <SelectItem value="4">{t.birads4}</SelectItem>
                    <SelectItem value="5">{t.birads5}</SelectItem>
                    <SelectItem value="6">{t.birads6}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* QOSHIMCHA */}
        <AccordionItem value="additional" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.additionalInfo}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-2">
              <Label>{t.notes}</Label>
              <Textarea placeholder={t.additionalObservations} value={data.notes || ""} onChange={(e) => updateField("notes", e.target.value)} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
