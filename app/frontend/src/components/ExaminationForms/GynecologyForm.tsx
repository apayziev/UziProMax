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
            {/* 1-qator: Pozitsiya va o'lchamlar */}
            <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
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
                <Input type="number" placeholder="44-70" value={data.uterus_length || ""} onChange={(e) => updateField("uterus_length", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.width} ({t.mm})</Label>
                <Input type="number" placeholder="42-60" value={data.uterus_width || ""} onChange={(e) => updateField("uterus_width", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.thickness} ({t.mm})</Label>
                <Input type="number" placeholder="33-46" value={data.uterus_thickness || ""} onChange={(e) => updateField("uterus_thickness", e.target.value)} />
              </div>
            </div>
            {/* 2-qator: Sifat ko'rsatkichlari */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
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
              <div className="space-y-2">
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
              <div className="space-y-2 col-span-2">
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
                <Input type="number" placeholder="5-14" value={data.endometrium_thickness || ""} onChange={(e) => updateField("endometrium_thickness", e.target.value)} />
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
              <div className="space-y-2">
                <Label>{t.length} ({t.mm})</Label>
                <Input type="number" value={data.cervix_length || ""} onChange={(e) => updateField("cervix_length", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.width} ({t.mm})</Label>
                <Input type="number" value={data.cervix_width || ""} onChange={(e) => updateField("cervix_width", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.endocervix} ({t.mm})</Label>
                <Input type="number" placeholder="2-8" value={data.endocervix || ""} onChange={(e) => updateField("endocervix", e.target.value)} />
              </div>
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
                {/* 1-qator: Umumiy ma'lumotlar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="space-y-2">
                    <Label>{t.nodeCount}</Label>
                    <Input type="number" placeholder="3-4" value={data.myoma_count || ""} onChange={(e) => updateField("myoma_count", e.target.value)} />
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
                        <SelectItem value="множественная">множественная</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t.nodeEchogenicity}</Label>
                    <Select value={data.myoma_echogenicity || ""} onValueChange={(v) => updateField("myoma_echogenicity", v)}>
                      <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="гиперэхогенные">{t.hyperechoic}</SelectItem>
                        <SelectItem value="гипоэхогенные">{t.hypoechoic}</SelectItem>
                        <SelectItem value="изоэхогенные">{t.isoechoic}</SelectItem>
                        <SelectItem value="смешанные">{t.mixed}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t.nodeShape}</Label>
                    <Select value={data.myoma_shape || ""} onValueChange={(v) => updateField("myoma_shape", v)}>
                      <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="округлая">{t.rounded}</SelectItem>
                        <SelectItem value="овальная">овальная</SelectItem>
                        <SelectItem value="неправильная">{t.irregular}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 2-qator: Kontur va CDC */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label>{t.nodeContours}</Label>
                    <Select value={data.myoma_contours || ""} onValueChange={(v) => updateField("myoma_contours", v)}>
                      <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ровные, четкие">{t.smooth}</SelectItem>
                        <SelectItem value="неровные">{t.uneven}</SelectItem>
                        <SelectItem value="нечеткие">{t.unclear}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t.cdkVascularization}</Label>
                    <Select value={data.myoma_cdk || ""} onValueChange={(v) => updateField("myoma_cdk", v)}>
                      <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="аваскулярный">{t.avascular}</SelectItem>
                        <SelectItem value="периферический">{t.peripheral}</SelectItem>
                        <SelectItem value="центральный">{t.central}</SelectItem>
                        <SelectItem value="смешанный">{t.mixedVasc}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t.figoType}</Label>
                    <Select value={data.myoma_figo || ""} onValueChange={(v) => updateField("myoma_figo", v)}>
                      <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">FIGO 0 - submukosal oyoqchada</SelectItem>
                        <SelectItem value="1">FIGO 1 - submukosal &lt;50%</SelectItem>
                        <SelectItem value="2">FIGO 2 - submukosal &gt;50%</SelectItem>
                        <SelectItem value="3">FIGO 3 - intramural (endometriyga tegib)</SelectItem>
                        <SelectItem value="4">FIGO 4 - intramural</SelectItem>
                        <SelectItem value="5">FIGO 5 - subseroz &gt;50%</SelectItem>
                        <SelectItem value="6">FIGO 6 - subseroz &lt;50%</SelectItem>
                        <SelectItem value="7">FIGO 7 - subseroz oyoqchada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 3-qator: Intramural tugunlar o'lchami */}
                <div className="space-y-2">
                  <Label>{t.intramuralNode} - {t.nodeSizes}</Label>
                  <Input 
                    placeholder={language === "ru" ? "от 2.5х3.9мм до 10.3х7.9мм" : "2.5x3.9mm dan 10.3x7.9mm gacha"} 
                    value={data.myoma_intramural_sizes || ""} 
                    onChange={(e) => updateField("myoma_intramural_sizes", e.target.value)} 
                  />
                </div>

                {/* 4-qator: Subseroz tugun */}
                <div className="p-3 border rounded-lg bg-orange-100/50">
                  <h4 className="font-medium text-sm mb-3">{t.subserousNode}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="space-y-2">
                      <Label>{t.nodeLocation}</Label>
                      <Select value={data.subserous_location || ""} onValueChange={(v) => updateField("subserous_location", v)}>
                        <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="дно матки">{t.fundus}</SelectItem>
                          <SelectItem value="передняя стенка">{t.anteriorWall}</SelectItem>
                          <SelectItem value="задняя стенка">{t.posteriorWall}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{t.length} ({t.mm})</Label>
                      <Input type="number" placeholder="65.3" value={data.subserous_length || ""} onChange={(e) => updateField("subserous_length", e.target.value)} className="h-9" />
                    </div>
                    <div className="space-y-2">
                      <Label>{t.width} ({t.mm})</Label>
                      <Input type="number" placeholder="5.4" value={data.subserous_width || ""} onChange={(e) => updateField("subserous_width", e.target.value)} className="h-9" />
                    </div>
                    <div className="space-y-2">
                      <Label>{t.thickness} ({t.mm})</Label>
                      <Input type="number" placeholder="60.4" value={data.subserous_thickness || ""} onChange={(e) => updateField("subserous_thickness", e.target.value)} className="h-9" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <Label>{t.figoType}</Label>
                    <Select value={data.subserous_figo || ""} onValueChange={(v) => updateField("subserous_figo", v)}>
                      <SelectTrigger className="h-9 mt-1"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">FIGO 5 - subseroz &gt;50%</SelectItem>
                        <SelectItem value="6">FIGO 6 - subseroz &lt;50%</SelectItem>
                        <SelectItem value="7">FIGO 7 - subseroz oyoqchada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Qo'shimcha tavsif */}
                <div className="space-y-2">
                  <Label>{t.nodeDescription}</Label>
                  <Input 
                    placeholder={language === "ru" ? "Дополнительное описание узлов..." : "Tugunlar haqida qo'shimcha..."} 
                    value={data.myoma_description || ""} 
                    onChange={(e) => updateField("myoma_description", e.target.value)} 
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Kista uchun qo'shimcha - O-RADS */}
        {templateType === "gynecology_cyst" && (
          <AccordionItem value="cyst" className="border rounded-lg px-4 border-purple-200 bg-purple-50/50">
            <AccordionTrigger className="text-base font-semibold hover:no-underline text-purple-700">
              {t.ovarianMass}
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label>{t.localization}</Label>
                    <Select value={data.cyst_location || ""} onValueChange={(v) => updateField("cyst_location", v)}>
                      <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="правый придаток">{t.rightOvary}</SelectItem>
                        <SelectItem value="левый придаток">{t.leftOvary}</SelectItem>
                        <SelectItem value="оба придатка">Оба придатка</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t.size} ({t.mm})</Label>
                    <Input placeholder="30x25x20" value={data.cyst_size || ""} onChange={(e) => updateField("cyst_size", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.massContent}</Label>
                    <Select value={data.cyst_content || ""} onValueChange={(v) => updateField("cyst_content", v)}>
                      <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="анэхогенное">{t.anechoicContent}</SelectItem>
                        <SelectItem value="с перегородками">{t.withSeptations}</SelectItem>
                        <SelectItem value="с солидным компонентом">{t.withSolidComponent}</SelectItem>
                        <SelectItem value="смешанное">{t.mixed}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t.oradsClassification}</Label>
                  <Select value={data.cyst_orads || ""} onValueChange={(v) => updateField("cyst_orads", v)}>
                    <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="O-RADS 1">{t.orads1}</SelectItem>
                      <SelectItem value="O-RADS 2">{t.orads2}</SelectItem>
                      <SelectItem value="O-RADS 2-3">O-RADS 2-3</SelectItem>
                      <SelectItem value="O-RADS 3">{t.orads3}</SelectItem>
                      <SelectItem value="O-RADS 4">{t.orads4}</SelectItem>
                      <SelectItem value="O-RADS 5">{t.orads5}</SelectItem>
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
