/**
 * Akusherlik UZI formasi - Homiladorlik skriningi
 * DRY + Accordion (yig'iladigan bo'limlar)
 */
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
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
import { getObstetricsTranslations, type Language } from "./translations"

interface ObstetricsFormProps {
  data: Record<string, any>
  onChange: (data: Record<string, any>) => void
  templateType: string
  language?: Language
}

export function ObstetricsForm({ data, onChange, templateType, language = "ru" }: ObstetricsFormProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const isFirstTrimester = templateType === "obstetrics_1"
  const isDoppler = templateType === "doppler"
  const t = getObstetricsTranslations(language)

  return (
    <div className="space-y-4">
      {/* HOMILADORLIK MA'LUMOTLARI - har doim ko'rinadi */}
      <div className="p-4 border rounded-lg bg-muted/30">
        <h3 className="text-base font-semibold mb-3">{t.pregnancy}</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="space-y-2">
            <Label>{t.lastMenstruation}</Label>
            <DatePicker
              value={data.last_menstruation || null}
              onChange={(date) => updateField("last_menstruation", date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : null)}
              language={language}
            />
          </div>
          <div className="space-y-2">
            <Label>{t.gestationalAge}</Label>
            <div className="flex gap-2">
              <Input type="number" placeholder={t.weeks} className="w-20" value={data.gestational_weeks || ""} onChange={(e) => updateField("gestational_weeks", e.target.value)} />
              <Input type="number" placeholder={t.days} className="w-20" value={data.gestational_days || ""} onChange={(e) => updateField("gestational_days", e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t.fetusCount}</Label>
            <Select value={data.fetus_count || "1"} onValueChange={(v) => updateField("fetus_count", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2 ({t.twins})</SelectItem>
                <SelectItem value="3">3 ({t.triplets})</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t.presentation}</Label>
            <Select value={data.presentation || ""} onValueChange={(v) => updateField("presentation", v)}>
              <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="головное">{t.cephalic}</SelectItem>
                <SelectItem value="тазовое">{t.breech}</SelectItem>
                <SelectItem value="поперечное">{t.transverse}</SelectItem>
                <SelectItem value="косое">{t.oblique}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["fetometry"]} className="space-y-2">
        {/* FETOMETRIYA */}
        <AccordionItem value="fetometry" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.fetometry}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {isFirstTrimester ? (
                <>
                  <div className="space-y-2">
                    <Label>{t.crl} ({t.mm})</Label>
                    <Input type="number" placeholder={t.crlFull} value={data.crl || ""} onChange={(e) => updateField("crl", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.nt} ({t.mm})</Label>
                    <Input type="number" placeholder="< 3.0" value={data.nt || ""} onChange={(e) => updateField("nt", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.nasalBone}</Label>
                    <Select value={data.nasal_bone || ""} onValueChange={(v) => updateField("nasal_bone", v)}>
                      <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="определяется">{t.determined}</SelectItem>
                        <SelectItem value="не определяется">{t.notDetermined}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label>{t.bpd} ({t.mm})</Label>
                    <Input type="number" value={data.bpd || ""} onChange={(e) => updateField("bpd", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.hc} ({t.mm})</Label>
                    <Input type="number" value={data.hc || ""} onChange={(e) => updateField("hc", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.ac} ({t.mm})</Label>
                    <Input type="number" value={data.ac || ""} onChange={(e) => updateField("ac", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.fl} ({t.mm})</Label>
                    <Input type="number" value={data.fl || ""} onChange={(e) => updateField("fl", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.fetalWeight} ({t.gram})</Label>
                    <Input type="number" value={data.fetal_weight || ""} onChange={(e) => updateField("fetal_weight", e.target.value)} />
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label>{t.fhr} ({t.fhrUnit})</Label>
                <Input type="number" placeholder="120-160" value={data.fhr || ""} onChange={(e) => updateField("fhr", e.target.value)} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ANATOMIYA */}
        <AccordionItem value="anatomy" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.fetalAnatomy}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label>{t.brainStructure}</Label>
                <Select value={data.brain_structure || ""} onValueChange={(v) => updateField("brain_structure", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="дифференцируется четко">{t.clearDiff}</SelectItem>
                    <SelectItem value="изменена">{t.changed}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.lateralVentricles}</Label>
                <Select value={data.lateral_ventricles || ""} onValueChange={(v) => updateField("lateral_ventricles", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не расширены">{t.notDilated}</SelectItem>
                    <SelectItem value="расширены">{t.dilated}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.spine}</Label>
                <Select value={data.spine || ""} onValueChange={(v) => updateField("spine", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="прослеживается на всем протяжении">{t.traceable}</SelectItem>
                    <SelectItem value="деформирован">{t.deformed}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.heart4ch}</Label>
                <Select value={data.heart_4ch || ""} onValueChange={(v) => updateField("heart_4ch", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="определяется">{t.determined}</SelectItem>
                    <SelectItem value="не определяется">{t.notDetermined}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.stomach}</Label>
                <Select value={data.stomach || ""} onValueChange={(v) => updateField("stomach", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="определяется">{t.determined}</SelectItem>
                    <SelectItem value="не определяется">{t.notDetermined}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.kidneys}</Label>
                <Select value={data.kidneys || ""} onValueChange={(v) => updateField("kidneys", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="на типичном месте">{t.typicalLocation}</SelectItem>
                    <SelectItem value="не визуализируются">{t.notVisualized}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* PLATSENTA */}
        <AccordionItem value="placenta" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.placenta}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="space-y-2">
                <Label>{t.location}</Label>
                <Select value={data.placenta_location || ""} onValueChange={(v) => updateField("placenta_location", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="по передней стенке">{t.anteriorWall}</SelectItem>
                    <SelectItem value="по задней стенке">{t.posteriorWall}</SelectItem>
                    <SelectItem value="в дне">{t.fundus}</SelectItem>
                    <SelectItem value="низкое">{t.lowLying}</SelectItem>
                    <SelectItem value="предлежание">{t.previa}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.thickness} ({t.mm})</Label>
                <Input type="number" value={data.placenta_thickness || ""} onChange={(e) => updateField("placenta_thickness", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.maturity}</Label>
                <Select value={data.placenta_grade || ""} onValueChange={(v) => updateField("placenta_grade", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">{t.grade0}</SelectItem>
                    <SelectItem value="1">{t.grade1}</SelectItem>
                    <SelectItem value="2">{t.grade2}</SelectItem>
                    <SelectItem value="3">{t.grade3}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.structure}</Label>
                <Select value={data.placenta_structure || ""} onValueChange={(v) => updateField("placenta_structure", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="однородная">{t.homogeneous}</SelectItem>
                    <SelectItem value="неоднородная">{t.heterogeneous}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* HOMILA SUVI */}
        <AccordionItem value="amniotic" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.amnioticFluid}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label>{t.quantity}</Label>
                <Select value={data.amniotic_fluid || ""} onValueChange={(v) => updateField("amniotic_fluid", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="нормальное">{t.normalAmount}</SelectItem>
                    <SelectItem value="маловодие">{t.oligohydramnios}</SelectItem>
                    <SelectItem value="многоводие">{t.polyhydramnios}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.afi} ({t.mm})</Label>
                <Input type="number" placeholder="80-180" value={data.afi || ""} onChange={(e) => updateField("afi", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.quality}</Label>
                <Select value={data.amniotic_quality || ""} onValueChange={(v) => updateField("amniotic_quality", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="прозрачные">{t.clear}</SelectItem>
                    <SelectItem value="с взвесью">{t.withSuspension}</SelectItem>
                    <SelectItem value="мутные">{t.cloudy}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* BACHADON BO'YNI */}
        <AccordionItem value="cervix" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.cervix}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>{t.length} ({t.mm})</Label>
                <Input type="number" placeholder="25-40" value={data.cervix_length || ""} onChange={(e) => updateField("cervix_length", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.internalOs}</Label>
                <Select value={data.internal_os || ""} onValueChange={(v) => updateField("internal_os", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="закрыт">{t.closed}</SelectItem>
                    <SelectItem value="открыт">{t.open}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* DOPPLER */}
        {isDoppler && (
          <AccordionItem value="doppler" className="border rounded-lg px-4 border-blue-200 bg-blue-50/50">
            <AccordionTrigger className="text-base font-semibold hover:no-underline text-blue-700">
              {t.doppler}
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="space-y-2">
                  <Label>{t.mcaSd}</Label>
                  <Input type="number" step="0.01" value={data.mca_sd || ""} onChange={(e) => updateField("mca_sd", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>{t.uaSd}</Label>
                  <Input type="number" step="0.01" value={data.ua_sd || ""} onChange={(e) => updateField("ua_sd", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>{t.rightUaSd}</Label>
                  <Input type="number" step="0.01" value={data.right_ua_sd || ""} onChange={(e) => updateField("right_ua_sd", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>{t.leftUaSd}</Label>
                  <Input type="number" step="0.01" value={data.left_ua_sd || ""} onChange={(e) => updateField("left_ua_sd", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>{t.fetalFlowDisorder}</Label>
                  <Select value={data.fetal_flow_disorder || ""} onValueChange={(v) => updateField("fetal_flow_disorder", v)}>
                    <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="нет">{t.no}</SelectItem>
                      <SelectItem value="Iа степень">{t.degree1a}</SelectItem>
                      <SelectItem value="Iб степень">{t.degree1b}</SelectItem>
                      <SelectItem value="II степень">{t.degree2}</SelectItem>
                      <SelectItem value="III степень">{t.degree3}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  )
}
