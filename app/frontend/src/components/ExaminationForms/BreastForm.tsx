/**
 * Sut bezlari UZI formasi - Молочные железы
 * Original shablon asosida to'liq fieldlar
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
      {/* ==================== UMUMIY MA'LUMOTLAR ==================== */}
      <div className="p-4 border rounded-lg bg-muted/30">
        <h3 className="text-base font-semibold mb-3">{t.generalData}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="space-y-2">
            <Label className="text-xs">{t.pmcDay}</Label>
            <Input type="date" value={data.pmc_date || ""} onChange={(e) => updateField("pmc_date", e.target.value)} className="h-9" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t.cycleDay}</Label>
            <Input type="number" placeholder="1-30" value={data.cycle_day || ""} onChange={(e) => updateField("cycle_day", e.target.value)} className="h-9" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t.sensor}</Label>
            <Select value={data.sensor || ""} onValueChange={(v) => updateField("sensor", v)}>
              <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="линейный мультичастотный">{t.linearMultifreq}</SelectItem>
                <SelectItem value="линейный">{t.linear}</SelectItem>
                <SelectItem value="конвексный">{t.convex}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t.complaints}</Label>
            <Select value={data.complaints || ""} onValueChange={(v) => updateField("complaints", v)}>
              <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="нет">{t.none}</SelectItem>
                <SelectItem value="боль">{t.pain}</SelectItem>
                <SelectItem value="уплотнение">{t.lump}</SelectItem>
                <SelectItem value="выделения">{t.discharge}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Umumiy xususiyatlar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 pt-3 border-t">
          <div className="space-y-2">
            <Label className="text-xs">{t.symmetry}</Label>
            <Select value={data.symmetry || ""} onValueChange={(v) => updateField("symmetry", v)}>
              <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="симметричны">{t.symmetrical}</SelectItem>
                <SelectItem value="асимметричны">{t.asymmetrical}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t.skin}</Label>
            <Select value={data.skin || ""} onValueChange={(v) => updateField("skin", v)}>
              <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="без УЗ-признаков патологии">{t.noPathology}</SelectItem>
                <SelectItem value="утолщена">{t.thickened}</SelectItem>
                <SelectItem value="изменена">{t.changed}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t.tissueDiff}</Label>
            <Select value={data.tissue_diff || ""} onValueChange={(v) => updateField("tissue_diff", v)}>
              <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="хорошая">{t.good}</SelectItem>
                <SelectItem value="удовлетворительная">{t.satisfactory}</SelectItem>
                <SelectItem value="затруднена">{t.difficult}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t.fatTissue}</Label>
            <Select value={data.fat_tissue || ""} onValueChange={(v) => updateField("fat_tissue", v)}>
              <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="выражена умеренно">{t.moderatelyExpressed}</SelectItem>
                <SelectItem value="слабо выражена">{t.weaklyExpressed}</SelectItem>
                <SelectItem value="хорошо выражена">{t.wellExpressed}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
          <div className="space-y-2">
            <Label className="text-xs">{t.cooperLigaments}</Label>
            <Select value={data.cooper_ligaments || ""} onValueChange={(v) => updateField("cooper_ligaments", v)}>
              <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="дифференцируются">{t.differentiated}</SelectItem>
                <SelectItem value="не дифференцируются">{t.notDifferentiated}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t.nippleAreola}</Label>
            <Select value={data.nipple_areola || ""} onValueChange={(v) => updateField("nipple_areola", v)}>
              <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="без УЗ-признаков патологии">{t.noPathology}</SelectItem>
                <SelectItem value="изменены">{t.changed}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* ==================== ЖЕЛЕЗИСТАЯ ТКАНЬ ==================== */}
      <div className="p-4 border rounded-lg bg-blue-50/30">
        <h3 className="text-base font-semibold mb-3">{t.glandularTissue}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="space-y-2">
            <Label className="text-xs">{t.tissueType}</Label>
            <Select value={data.tissue_type || ""} onValueChange={(v) => updateField("tissue_type", v)}>
              <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="единым пластом (возрастная норма)">{t.singleLayer}</SelectItem>
                <SelectItem value="железистый тип">{t.glandularType}</SelectItem>
                <SelectItem value="смешанный тип">{t.mixedType}</SelectItem>
                <SelectItem value="жировой тип">{t.fattyType}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t.thicknessRight} ({t.mm})</Label>
            <Input type="number" step="0.1" placeholder="15.7" value={data.gland_thickness_right || ""} onChange={(e) => updateField("gland_thickness_right", e.target.value)} className="h-9" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t.thicknessLeft} ({t.mm})</Label>
            <Input type="number" step="0.1" placeholder="15.5" value={data.gland_thickness_left || ""} onChange={(e) => updateField("gland_thickness_left", e.target.value)} className="h-9" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t.tissueEchogenicity}</Label>
            <Select value={data.tissue_echogenicity || ""} onValueChange={(v) => updateField("tissue_echogenicity", v)}>
              <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="обычная">{t.normal}</SelectItem>
                <SelectItem value="умеренно повышена">{t.moderatelyIncreased}</SelectItem>
                <SelectItem value="повышена">{t.increased}</SelectItem>
                <SelectItem value="понижена">{t.decreased}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Млечные протоки */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 pt-3 border-t">
          <div className="space-y-2">
            <Label className="text-xs">{t.milkDucts}</Label>
            <Select value={data.milk_ducts || ""} onValueChange={(v) => updateField("milk_ducts", v)}>
              <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="не расширены">{t.notDilated}</SelectItem>
                <SelectItem value="расширены">{t.dilated}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t.ductDiameter} ({t.mm})</Label>
            <Input type="number" step="0.1" placeholder="1.6" value={data.duct_diameter || ""} onChange={(e) => updateField("duct_diameter", e.target.value)} className="h-9" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t.ductWalls}</Label>
            <Select value={data.duct_walls || ""} onValueChange={(v) => updateField("duct_walls", v)}>
              <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="не уплотнены">{t.notThickened}</SelectItem>
                <SelectItem value="уплотнены">{t.thickened}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t.ductSystem}</Label>
            <Select value={data.duct_system || ""} onValueChange={(v) => updateField("duct_system", v)}>
              <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="соответствует возрастной норме">{t.ageAppropriate}</SelectItem>
                <SelectItem value="не соответствует">{t.notAgeAppropriate}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["right_breast"]} className="space-y-2">
        {/* ==================== O'NG SUT BEZI ==================== */}
        <AccordionItem value="right_breast" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.rightBreast}
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">{t.parenchymaDiff}</Label>
                <Select value={data.right_parenchyma_diff || ""} onValueChange={(v) => updateField("right_parenchyma_diff", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="удовлетворительная">{t.satisfactory}</SelectItem>
                    <SelectItem value="хорошая">{t.good}</SelectItem>
                    <SelectItem value="затруднена">{t.difficult}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.echogenicity}</Label>
                <Select value={data.right_echogenicity || ""} onValueChange={(v) => updateField("right_echogenicity", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="обычная">{t.normal}</SelectItem>
                    <SelectItem value="умеренно диффузно повышена">{t.moderatelyDiffuseIncreased}</SelectItem>
                    <SelectItem value="повышена">{t.increased}</SelectItem>
                    <SelectItem value="понижена">{t.decreased}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.ductsVisualization}</Label>
                <Select value={data.right_ducts || ""} onValueChange={(v) => updateField("right_ducts", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не расширены">{t.notDilated}</SelectItem>
                    <SelectItem value="расширены">{t.dilated}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.ductsPhase}</Label>
                <Select value={data.right_ducts_phase || ""} onValueChange={(v) => updateField("right_ducts_phase", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 фазе МЦ">{t.phase1}</SelectItem>
                    <SelectItem value="2 фазе МЦ">{t.phase2}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* So'rsak va yog' qatlami */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">{t.nipple}</Label>
                <Select value={data.right_nipple || ""} onValueChange={(v) => updateField("right_nipple", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="форма округлая, контур ровный, структура однородная">{t.nippleNormal}</SelectItem>
                    <SelectItem value="изменен">{t.changed}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.fatLayer}</Label>
                <Select value={data.right_fat_layer || ""} onValueChange={(v) => updateField("right_fat_layer", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="без особенностей">{t.noFeatures}</SelectItem>
                    <SelectItem value="изменена">{t.changed}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.retronippleArea}</Label>
                <Select value={data.right_retronipple || ""} onValueChange={(v) => updateField("right_retronipple", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="без особенностей">{t.noFeatures}</SelectItem>
                    <SelectItem value="изменена">{t.changed}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.vascularPattern}</Label>
                <Select value={data.right_vascular || ""} onValueChange={(v) => updateField("right_vascular", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не усилен">{t.notIntensified}</SelectItem>
                    <SelectItem value="усилен">{t.intensified}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* O'choqli o'zgarishlar va retromammar soha */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">{t.focalChanges}</Label>
                <Select value={data.right_focal || ""} onValueChange={(v) => updateField("right_focal", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не обнаружено">{t.notFound}</SelectItem>
                    <SelectItem value="обнаружено">{t.found}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.retromammarySpace}</Label>
                <Select value={data.right_retromammary || ""} onValueChange={(v) => updateField("right_retromammary", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="однородное">{t.homogeneous}</SelectItem>
                    <SelectItem value="неоднородное">{t.heterogeneous}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* O'smalar (agar topilsa) */}
            {data.right_focal === "обнаружено" && (
              <div className="p-3 border rounded-lg bg-red-50/50 space-y-3">
                <h4 className="font-medium text-sm text-red-700">{t.lesionDetails}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs">{t.localization}</Label>
                    <Input placeholder={t.atOclock} value={data.right_lesion_location || ""} onChange={(e) => updateField("right_lesion_location", e.target.value)} className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">{t.lesionSize} ({t.mm})</Label>
                    <Input placeholder="10x8" value={data.right_lesion_size || ""} onChange={(e) => updateField("right_lesion_size", e.target.value)} className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">{t.lesionType}</Label>
                    <Select value={data.right_lesion_type || ""} onValueChange={(v) => updateField("right_lesion_type", v)}>
                      <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="анэхогенное">{t.anechoicCyst}</SelectItem>
                        <SelectItem value="гипоэхогенное">{t.hypoechoic}</SelectItem>
                        <SelectItem value="изоэхогенное">{t.isoechoic}</SelectItem>
                        <SelectItem value="гиперэхогенное">{t.hyperechoic}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">{t.contours}</Label>
                    <Select value={data.right_lesion_contours || ""} onValueChange={(v) => updateField("right_lesion_contours", v)}>
                      <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ровные, четкие">{t.smooth}</SelectItem>
                        <SelectItem value="неровные">{t.uneven}</SelectItem>
                        <SelectItem value="нечеткие">{t.unclear}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* ==================== CHAP SUT BEZI ==================== */}
        <AccordionItem value="left_breast" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.leftBreast}
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">{t.parenchymaDiff}</Label>
                <Select value={data.left_parenchyma_diff || ""} onValueChange={(v) => updateField("left_parenchyma_diff", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="удовлетворительная">{t.satisfactory}</SelectItem>
                    <SelectItem value="хорошая">{t.good}</SelectItem>
                    <SelectItem value="затруднена">{t.difficult}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.tissueComposition}</Label>
                <Select value={data.left_tissue_type || ""} onValueChange={(v) => updateField("left_tissue_type", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="преимущественно железистой ткани">{t.predominantlyGlandular}</SelectItem>
                    <SelectItem value="смешанной ткани">{t.mixedTissue}</SelectItem>
                    <SelectItem value="преимущественно жировой ткани">{t.predominantlyFatty}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.echogenicity}</Label>
                <Select value={data.left_echogenicity || ""} onValueChange={(v) => updateField("left_echogenicity", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="обычная">{t.normal}</SelectItem>
                    <SelectItem value="повышена">{t.increased}</SelectItem>
                    <SelectItem value="понижена">{t.decreased}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.ductsVisualization}</Label>
                <Select value={data.left_ducts || ""} onValueChange={(v) => updateField("left_ducts", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не расширены">{t.notDilated}</SelectItem>
                    <SelectItem value="расширены">{t.dilated}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">{t.ductsPhase}</Label>
                <Select value={data.left_ducts_phase || ""} onValueChange={(v) => updateField("left_ducts_phase", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 фазе МЦ">{t.phase1}</SelectItem>
                    <SelectItem value="2 фазе МЦ">{t.phase2}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.retronippleArea}</Label>
                <Select value={data.left_retronipple || ""} onValueChange={(v) => updateField("left_retronipple", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="без особенностей">{t.noFeatures}</SelectItem>
                    <SelectItem value="изменена">{t.changed}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.focalChanges}</Label>
                <Select value={data.left_focal || ""} onValueChange={(v) => updateField("left_focal", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не обнаружено">{t.notFound}</SelectItem>
                    <SelectItem value="обнаружено">{t.found}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.retromammarySpace}</Label>
                <Select value={data.left_retromammary || ""} onValueChange={(v) => updateField("left_retromammary", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="однородное">{t.homogeneous}</SelectItem>
                    <SelectItem value="неоднородное">{t.heterogeneous}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* O'smalar (agar topilsa) */}
            {data.left_focal === "обнаружено" && (
              <div className="p-3 border rounded-lg bg-red-50/50 space-y-3">
                <h4 className="font-medium text-sm text-red-700">{t.lesionDetails}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs">{t.localization}</Label>
                    <Input placeholder={t.atOclock} value={data.left_lesion_location || ""} onChange={(e) => updateField("left_lesion_location", e.target.value)} className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">{t.lesionSize} ({t.mm})</Label>
                    <Input placeholder="10x8" value={data.left_lesion_size || ""} onChange={(e) => updateField("left_lesion_size", e.target.value)} className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">{t.lesionType}</Label>
                    <Select value={data.left_lesion_type || ""} onValueChange={(v) => updateField("left_lesion_type", v)}>
                      <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="анэхогенное">{t.anechoicCyst}</SelectItem>
                        <SelectItem value="гипоэхогенное">{t.hypoechoic}</SelectItem>
                        <SelectItem value="изоэхогенное">{t.isoechoic}</SelectItem>
                        <SelectItem value="гиперэхогенное">{t.hyperechoic}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">{t.contours}</Label>
                    <Select value={data.left_lesion_contours || ""} onValueChange={(v) => updateField("left_lesion_contours", v)}>
                      <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ровные, четкие">{t.smooth}</SelectItem>
                        <SelectItem value="неровные">{t.uneven}</SelectItem>
                        <SelectItem value="нечеткие">{t.unclear}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* ==================== LIMFA TUGUNLARI ==================== */}
        <AccordionItem value="lymph_nodes" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.regionalLymphNodes}
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            {/* Regional zonalar */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">{t.supraclavicular}</Label>
                <Select value={data.supraclavicular_ln || ""} onValueChange={(v) => updateField("supraclavicular_ln", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="без УЗ-признаков патологии">{t.noPathology}</SelectItem>
                    <SelectItem value="изменены">{t.changed}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.subclavicular}</Label>
                <Select value={data.subclavicular_ln || ""} onValueChange={(v) => updateField("subclavicular_ln", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="без УЗ-признаков патологии">{t.noPathology}</SelectItem>
                    <SelectItem value="изменены">{t.changed}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.anteriorChest}</Label>
                <Select value={data.anterior_chest_ln || ""} onValueChange={(v) => updateField("anterior_chest_ln", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="без УЗ-признаков патологии">{t.noPathology}</SelectItem>
                    <SelectItem value="изменены">{t.changed}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Qo'ltiq osti limfa tugunlari */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t">
              {/* O'ng */}
              <div className="p-3 border rounded-lg bg-muted/20 space-y-3">
                <h4 className="font-medium text-sm">{t.axillaryRight}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">{t.lnStatus}</Label>
                    <Select value={data.right_axillary_ln || ""} onValueChange={(v) => updateField("right_axillary_ln", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="не увеличены">{t.notEnlarged}</SelectItem>
                        <SelectItem value="увеличены">{t.enlarged}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.lnSize1} ({t.mm})</Label>
                    <Input placeholder="15.8x5.8" value={data.right_ln_size1 || ""} onChange={(e) => updateField("right_ln_size1", e.target.value)} className="h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.lnSize2} ({t.mm})</Label>
                    <Input placeholder="18.2x6.5" value={data.right_ln_size2 || ""} onChange={(e) => updateField("right_ln_size2", e.target.value)} className="h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.lnShape}</Label>
                    <Select value={data.right_ln_shape || ""} onValueChange={(v) => updateField("right_ln_shape", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="овальная">{t.oval}</SelectItem>
                        <SelectItem value="округлая">{t.round}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">{t.lnContours}</Label>
                    <Select value={data.right_ln_contours || ""} onValueChange={(v) => updateField("right_ln_contours", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ровные, четкие">{t.smooth}</SelectItem>
                        <SelectItem value="неровные">{t.uneven}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.lnEchogenicity}</Label>
                    <Select value={data.right_ln_echo || ""} onValueChange={(v) => updateField("right_ln_echo", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="обычная">{t.normal}</SelectItem>
                        <SelectItem value="умеренно диффузно повышена">{t.moderatelyDiffuseIncreased}</SelectItem>
                        <SelectItem value="повышена">{t.increased}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Chap */}
              <div className="p-3 border rounded-lg bg-muted/20 space-y-3">
                <h4 className="font-medium text-sm">{t.axillaryLeft}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">{t.lnStatus}</Label>
                    <Select value={data.left_axillary_ln || ""} onValueChange={(v) => updateField("left_axillary_ln", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="не увеличены">{t.notEnlarged}</SelectItem>
                        <SelectItem value="увеличены">{t.enlarged}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.lnSize1} ({t.mm})</Label>
                    <Input placeholder="14.2x6.3" value={data.left_ln_size1 || ""} onChange={(e) => updateField("left_ln_size1", e.target.value)} className="h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.lnSize2} ({t.mm})</Label>
                    <Input placeholder="16.8x5.7" value={data.left_ln_size2 || ""} onChange={(e) => updateField("left_ln_size2", e.target.value)} className="h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.lnShape}</Label>
                    <Select value={data.left_ln_shape || ""} onValueChange={(v) => updateField("left_ln_shape", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="овальная">{t.oval}</SelectItem>
                        <SelectItem value="округлая">{t.round}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">{t.lnContours}</Label>
                    <Select value={data.left_ln_contours || ""} onValueChange={(v) => updateField("left_ln_contours", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ровные, четкие">{t.smooth}</SelectItem>
                        <SelectItem value="неровные">{t.uneven}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.lnEchogenicity}</Label>
                    <Select value={data.left_ln_echo || ""} onValueChange={(v) => updateField("left_ln_echo", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="обычная">{t.normal}</SelectItem>
                        <SelectItem value="умеренно диффузно повышена">{t.moderatelyDiffuseIncreased}</SelectItem>
                        <SelectItem value="повышена">{t.increased}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ==================== BI-RADS ==================== */}
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
