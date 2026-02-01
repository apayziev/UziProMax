/**
 * Ginekologiya UZI formasi - Матка, Кисты, Миома
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
import { getGynecologyTranslations, type Language } from "./translations"

interface GynecologyFormProps {
  data: Record<string, any>
  onChange: (data: Record<string, any>) => void
  templateType: string
  language?: Language
}

export function GynecologyForm({ data, onChange, templateType, language = "ru" }: GynecologyFormProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const t = getGynecologyTranslations(language)

  return (
    <div className="space-y-4">
      {/* HAYZ KUNI - har doim ko'rinadi */}
      <div className="p-4 border rounded-lg bg-muted/30">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t.lastMenstruation}</Label>
            <DatePicker
              value={data.last_menstruation || null}
              onChange={(date) => updateField("last_menstruation", date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : null)}
              language={language}
            />
          </div>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["uterus"]} className="space-y-2">
        {/* BACHADON */}
        <AccordionItem value="uterus" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.uterus}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              <div className="space-y-2 col-span-2">
                <Label>{t.position}</Label>
                <Select value={data.uterus_position || ""} onValueChange={(v) => updateField("uterus_position", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anteflexio">anteflexio</SelectItem>
                    <SelectItem value="retroflexio">retroflexio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.length} ({t.mm})</Label>
                <Input type="number" placeholder="44-70" className="w-full" value={data.uterus_length || ""} onChange={(e) => updateField("uterus_length", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.width} ({t.mm})</Label>
                <Input type="number" placeholder="42-60" className="w-full" value={data.uterus_width || ""} onChange={(e) => updateField("uterus_width", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.thickness} ({t.mm})</Label>
                <Input type="number" placeholder="33-46" className="w-full" value={data.uterus_thickness || ""} onChange={(e) => updateField("uterus_thickness", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.contours}</Label>
                <Select value={data.uterus_contour || ""} onValueChange={(v) => updateField("uterus_contour", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ровные, четкие">{t.smooth}</SelectItem>
                    <SelectItem value="неровные">{t.uneven}</SelectItem>
                    <SelectItem value="бугристые">{t.bumpy}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>{t.myometriumStructure}</Label>
                <Select value={data.myometrium_structure || ""} onValueChange={(v) => updateField("myometrium_structure", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="однородная">{t.homogeneous}</SelectItem>
                    <SelectItem value="неоднородная">{t.heterogeneous}</SelectItem>
                    <SelectItem value="с узлами">{t.withNodes}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Bachadon bo'shlig'i */}
              <div className="space-y-2">
                <Label>{t.uterineCavity}</Label>
                <Select value={data.uterine_cavity || ""} onValueChange={(v) => updateField("uterine_cavity", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не деформирована, не расширена">{t.notDeformed}, {t.notExpanded}</SelectItem>
                    <SelectItem value="деформирована">{t.deformed}</SelectItem>
                    <SelectItem value="расширена">{t.expanded}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ENDOMETRIY */}
        <AccordionItem value="endometrium" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.endometrium}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label>{t.thickness} ({t.mm})</Label>
                <Input type="number" placeholder="5-14" className="w-full" value={data.endometrium_thickness || ""} onChange={(e) => updateField("endometrium_thickness", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.echostructure}</Label>
                <Select value={data.endometrium_structure || ""} onValueChange={(v) => updateField("endometrium_structure", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="однородная">{t.homogeneous}</SelectItem>
                    <SelectItem value="неоднородная">{t.heterogeneous}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label>{t.mcPhase}</Label>
                <Select value={data.menstrual_phase || ""} onValueChange={(v) => updateField("menstrual_phase", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="пролиферативная">{t.proliferative}</SelectItem>
                    <SelectItem value="секреторная">{t.secretory}</SelectItem>
                    <SelectItem value="менструальная">{t.menstrual}</SelectItem>
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
            <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
              <div className="space-y-2 col-span-2">
                <Label>{t.cervixShape}</Label>
                <Select value={data.cervix_shape || ""} onValueChange={(v) => updateField("cervix_shape", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="цилиндрическая">{t.cylindrical}</SelectItem>
                    <SelectItem value="коническая">{t.conical}</SelectItem>
                    <SelectItem value="неправильная">{t.irregular}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.length} ({t.mm})</Label>
                <Input type="number" className="w-full" value={data.cervix_length || ""} onChange={(e) => updateField("cervix_length", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.width} ({t.mm})</Label>
                <Input type="number" className="w-full" value={data.cervix_width || ""} onChange={(e) => updateField("cervix_width", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.endocervix} ({t.mm})</Label>
                <Input type="number" placeholder="2-8" className="w-full" value={data.endocervix || ""} onChange={(e) => updateField("endocervix", e.target.value)} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* TUXUMDONLAR */}
        <AccordionItem value="ovaries" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.ovaries}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* O'ng tuxumdon */}
              <div className="space-y-3 p-3 border rounded-lg bg-muted/20">
                <h4 className="font-medium text-sm">{t.rightOvary}</h4>
                <div className="space-y-2">
                  <Label className="text-xs">{t.size} ({t.mm})</Label>
                  <Input placeholder={t.lengthWidthThickness} value={data.ovary_right_size || ""} onChange={(e) => updateField("ovary_right_size", e.target.value)} className="h-9" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">{t.volume} ({t.ml})</Label>
                    <Input type="number" value={data.ovary_right_volume || ""} onChange={(e) => updateField("ovary_right_volume", e.target.value)} className="h-9" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.follicles}</Label>
                    <Input placeholder={t.diameterCount} value={data.ovary_right_follicles || ""} onChange={(e) => updateField("ovary_right_follicles", e.target.value)} className="h-9" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t.maxFollicle} ({t.mm})</Label>
                  <Input type="number" placeholder="Ø" value={data.ovary_right_max_follicle || ""} onChange={(e) => updateField("ovary_right_max_follicle", e.target.value)} className="h-9" />
                </div>
                {(templateType === "gynecology_cyst" || templateType === "gynecology_myoma") && (
                  <div className="space-y-1">
                    <Label className="text-xs">{t.mass}</Label>
                    <Input placeholder={t.sizeStructure} value={data.ovary_right_mass || ""} onChange={(e) => updateField("ovary_right_mass", e.target.value)} className="h-9" />
                  </div>
                )}
              </div>
              
              {/* Chap tuxumdon */}
              <div className="space-y-3 p-3 border rounded-lg bg-muted/20">
                <h4 className="font-medium text-sm">{t.leftOvary}</h4>
                <div className="space-y-2">
                  <Label className="text-xs">{t.size} ({t.mm})</Label>
                  <Input placeholder={t.lengthWidthThickness} value={data.ovary_left_size || ""} onChange={(e) => updateField("ovary_left_size", e.target.value)} className="h-9" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">{t.volume} ({t.ml})</Label>
                    <Input type="number" value={data.ovary_left_volume || ""} onChange={(e) => updateField("ovary_left_volume", e.target.value)} className="h-9" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.follicles}</Label>
                    <Input placeholder={t.diameterCount} value={data.ovary_left_follicles || ""} onChange={(e) => updateField("ovary_left_follicles", e.target.value)} className="h-9" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t.maxFollicle} ({t.mm})</Label>
                  <Input type="number" placeholder="Ø" value={data.ovary_left_max_follicle || ""} onChange={(e) => updateField("ovary_left_max_follicle", e.target.value)} className="h-9" />
                </div>
                {(templateType === "gynecology_cyst" || templateType === "gynecology_myoma") && (
                  <div className="space-y-1">
                    <Label className="text-xs">{t.mass}</Label>
                    <Input placeholder={t.sizeStructure} value={data.ovary_left_mass || ""} onChange={(e) => updateField("ovary_left_mass", e.target.value)} className="h-9" />
                  </div>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* QO'SHIMCHA */}
        <AccordionItem value="additional" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.additional}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{t.fallopianTubes}</Label>
                <Select value={data.fallopian_tubes || ""} onValueChange={(v) => updateField("fallopian_tubes", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не визуализируются">{t.notVisualized}</SelectItem>
                    <SelectItem value="визуализируются">{t.visualized}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.fluidInPelvis}</Label>
                <Select value={data.fluid_in_pelvis || ""} onValueChange={(v) => updateField("fluid_in_pelvis", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не визуализируется">{t.notVisualized}</SelectItem>
                    <SelectItem value="незначительное количество">{t.insignificant}</SelectItem>
                    <SelectItem value="умеренное количество">{t.moderate}</SelectItem>
                    <SelectItem value="значительное количество">{t.significant}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.pelvicVeins}</Label>
                <Select value={data.pelvic_veins || ""} onValueChange={(v) => updateField("pelvic_veins", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не расширены">{t.notDilated}</SelectItem>
                    <SelectItem value="расширены">{t.dilated}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Mioma uchun qo'shimcha */}
        {templateType === "gynecology_myoma" && (
          <AccordionItem value="myoma" className="border rounded-lg px-4 border-orange-200 bg-orange-50/50">
            <AccordionTrigger className="text-base font-semibold hover:no-underline text-orange-700">
              {t.myomaNodes}
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{t.nodeCount}</Label>
                    <Input type="number" value={data.myoma_count || ""} onChange={(e) => updateField("myoma_count", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.localization}</Label>
                    <Select value={data.myoma_location || ""} onValueChange={(v) => updateField("myoma_location", v)}>
                      <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="передняя стенка">{t.anteriorWall}</SelectItem>
                        <SelectItem value="задняя стенка">{t.posteriorWall}</SelectItem>
                        <SelectItem value="дно">{t.fundus}</SelectItem>
                        <SelectItem value="боковая стенка">{t.lateralWall}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t.figoType}</Label>
                    <Select value={data.myoma_figo || ""} onValueChange={(v) => updateField("myoma_figo", v)}>
                      <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 - submukosal oyoqchada</SelectItem>
                        <SelectItem value="1">1 - submukosal &lt;50%</SelectItem>
                        <SelectItem value="2">2 - submukosal &gt;50%</SelectItem>
                        <SelectItem value="3">3 - intramural</SelectItem>
                        <SelectItem value="4">4 - intramural</SelectItem>
                        <SelectItem value="5">5 - subseroz &gt;50%</SelectItem>
                        <SelectItem value="6">6 - subseroz &lt;50%</SelectItem>
                        <SelectItem value="7">7 - subseroz oyoqchada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t.nodeSizes}</Label>
                  <Input placeholder={language === "ru" ? "размер1 мм, размер2 мм..." : "o'lcham1 mm, o'lcham2 mm..."} value={data.myoma_sizes || ""} onChange={(e) => updateField("myoma_sizes", e.target.value)} />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  )
}
