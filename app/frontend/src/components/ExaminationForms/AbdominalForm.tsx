/**
 * Qorin bo'shlig'i UZI formasi - Брюшное
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
import { getAbdominalTranslations, type Language } from "./translations"

interface AbdominalFormProps {
  data: Record<string, any>
  onChange: (data: Record<string, any>) => void
  language?: Language
}

export function AbdominalForm({ data, onChange, language = "ru" }: AbdominalFormProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const t = getAbdominalTranslations(language)

  return (
    <div className="space-y-4">
      <Accordion type="multiple" defaultValue={["liver"]} className="space-y-2">
        
        {/* ==================== JIGAR ==================== */}
        <AccordionItem value="liver" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.liver}
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            {/* Umumiy xususiyatlar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">{t.contours}</Label>
                <Select value={data.liver_contour || ""} onValueChange={(v) => updateField("liver_contour", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ровные, четкие">{t.smooth}</SelectItem>
                    <SelectItem value="неровные">{t.uneven}</SelectItem>
                    <SelectItem value="нечеткие">{t.unclear}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.lowerEdge}</Label>
                <Select value={data.liver_edge || ""} onValueChange={(v) => updateField("liver_edge", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="закруглён">закруглён</SelectItem>
                    <SelectItem value="острый">острый</SelectItem>
                    <SelectItem value="выступает">выступает</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.capsule}</Label>
                <Select value={data.liver_capsule || ""} onValueChange={(v) => updateField("liver_capsule", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="дифференцируется отчётливо">{t.capsuleDiff}</SelectItem>
                    <SelectItem value="утолщена">{t.capsuleThickened}</SelectItem>
                    <SelectItem value="не дифференцируется">{t.capsuleNoDiff}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.soundConduction}</Label>
                <Select value={data.liver_sound || ""} onValueChange={(v) => updateField("liver_sound", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="сохранена (хорошая)">{t.soundGood}</SelectItem>
                    <SelectItem value="снижена">{t.soundDecreased}</SelectItem>
                    <SelectItem value="резко снижена">{t.soundSeverelyDecreased}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* O'lchamlar - O'ng va Chap dolya */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {/* O'ng dolya */}
              <div className="p-3 border rounded-lg bg-muted/20">
                <h4 className="font-medium text-sm mb-3">{t.rightLobe}</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">КВР ({t.mm})</Label>
                    <Input type="number" placeholder="150-160" value={data.liver_kvr_right || ""} onChange={(e) => updateField("liver_kvr_right", e.target.value)} className="h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">ККР ({t.mm})</Label>
                    <Input type="number" placeholder="125-140" value={data.liver_kkr_right || ""} onChange={(e) => updateField("liver_kkr_right", e.target.value)} className="h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">ПЗР ({t.mm})</Label>
                    <Input type="number" placeholder="до 125" value={data.liver_pzr_right || ""} onChange={(e) => updateField("liver_pzr_right", e.target.value)} className="h-8" />
                  </div>
                </div>
              </div>
              {/* Chap dolya */}
              <div className="p-3 border rounded-lg bg-muted/20">
                <h4 className="font-medium text-sm mb-3">{t.leftLobe}</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">КВР ({t.mm})</Label>
                    <Input type="number" placeholder="до 100" value={data.liver_kvr_left || ""} onChange={(e) => updateField("liver_kvr_left", e.target.value)} className="h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">ПЗР ({t.mm})</Label>
                    <Input type="number" placeholder="до 60" value={data.liver_pzr_left || ""} onChange={(e) => updateField("liver_pzr_left", e.target.value)} className="h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.caudateLobe} ({t.mm})</Label>
                    <Input type="number" placeholder="до 20" value={data.liver_caudate || ""} onChange={(e) => updateField("liver_caudate", e.target.value)} className="h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Exostruktura va exogenlik */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="space-y-2">
                <Label className="text-xs">{t.echostructure}</Label>
                <Select value={data.liver_echostructure || ""} onValueChange={(v) => updateField("liver_echostructure", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="однородная">{t.homogeneous}</SelectItem>
                    <SelectItem value="неоднородная">{t.heterogeneous}</SelectItem>
                    <SelectItem value="диффузно неоднородная">{t.diffuseHeterogeneous}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.echogenicity}</Label>
                <Select value={data.liver_echogenicity || ""} onValueChange={(v) => updateField("liver_echogenicity", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не повышенной эхогенности">{t.normal}</SelectItem>
                    <SelectItem value="повышенной эхогенности">{t.increased}</SelectItem>
                    <SelectItem value="сниженной эхогенности">{t.decreased}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.focalChanges}</Label>
                <Select value={data.liver_focal || ""} onValueChange={(v) => updateField("liver_focal", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не выявлено">{t.notRevealed}</SelectItem>
                    <SelectItem value="выявлено">{t.revealed}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.vascularPattern}</Label>
                <Select value={data.liver_vessels || ""} onValueChange={(v) => updateField("liver_vessels", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не обеднён, чётко визуализируется">{t.notImpoverished}</SelectItem>
                    <SelectItem value="обеднён">{t.impoverished}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Tomirlar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t">
              <div className="space-y-2">
                <Label className="text-xs">{t.portalVein} ({t.mm})</Label>
                <Input type="number" placeholder="7-14" value={data.portal_vein || ""} onChange={(e) => updateField("portal_vein", e.target.value)} className="h-9" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.ivc} ({t.mm})</Label>
                <Input type="number" placeholder="12-23" value={data.ivc || ""} onChange={(e) => updateField("ivc", e.target.value)} className="h-9" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.choledoch} ({t.mm})</Label>
                <Input type="number" placeholder="4-8" value={data.choledoch || ""} onChange={(e) => updateField("choledoch", e.target.value)} className="h-9" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.bileDucts}</Label>
                <Select value={data.bile_ducts || ""} onValueChange={(v) => updateField("bile_ducts", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не расширены">{t.notDilated}</SelectItem>
                    <SelectItem value="расширены">{t.dilated}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ==================== O'T PUFAGI ==================== */}
        <AccordionItem value="gallbladder" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.gallbladder}
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">{t.shape}</Label>
                <Select value={data.gallbladder_shape || ""} onValueChange={(v) => updateField("gallbladder_shape", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="грушевидная">{t.pearShaped}</SelectItem>
                    <SelectItem value="овальная">{t.oval}</SelectItem>
                    <SelectItem value="неправильная">{t.irregularShape}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.bend}</Label>
                <Input placeholder={t.inNeckArea} value={data.gallbladder_bend || ""} onChange={(e) => updateField("gallbladder_bend", e.target.value)} className="h-9" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.size} ({t.mm})</Label>
                <Input placeholder="70x30" value={data.gallbladder_size || ""} onChange={(e) => updateField("gallbladder_size", e.target.value)} className="h-9" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.gallbladderEnlarged}</Label>
                <Select value={data.gallbladder_enlarged || ""} onValueChange={(v) => updateField("gallbladder_enlarged", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="нет">{t.no}</SelectItem>
                    <SelectItem value="да">{t.yes}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">{t.wallContour}</Label>
                <Select value={data.gallbladder_wall_contour || ""} onValueChange={(v) => updateField("gallbladder_wall_contour", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ровные, чёткие">{t.smooth}</SelectItem>
                    <SelectItem value="неровные">{t.uneven}</SelectItem>
                    <SelectItem value="нечёткие">{t.unclear}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.wallThickness} ({t.mm})</Label>
                <Input type="number" placeholder="1-2" value={data.gallbladder_wall || ""} onChange={(e) => updateField("gallbladder_wall", e.target.value)} className="h-9" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.content}</Label>
                <Select value={data.gallbladder_content || ""} onValueChange={(v) => updateField("gallbladder_content", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="гомогенное">{t.homogeneousContent}</SelectItem>
                    <SelectItem value="негомогенное">{t.heterogeneousContent}</SelectItem>
                    <SelectItem value="с осадком">{t.withSediment}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.formations}</Label>
                <Select value={data.gallbladder_formations || ""} onValueChange={(v) => updateField("gallbladder_formations", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="нет">{t.no}</SelectItem>
                    <SelectItem value="конкременты">{t.stones}</SelectItem>
                    <SelectItem value="полипы">{t.polyps}</SelectItem>
                    <SelectItem value="сладж">{t.sludge}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ==================== OSHQOZON OSTI BEZI ==================== */}
        <AccordionItem value="pancreas" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.pancreas}
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">{t.topography}</Label>
                <Select value={data.pancreas_topography || ""} onValueChange={(v) => updateField("pancreas_topography", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="расположена обычно">{t.usualLocation}</SelectItem>
                    <SelectItem value="смещена">{t.displaced}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.shape}</Label>
                <Select value={data.pancreas_shape || ""} onValueChange={(v) => updateField("pancreas_shape", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="обычная">{t.pancShape}</SelectItem>
                    <SelectItem value="гантелевидная">{t.dumbbellShaped}</SelectItem>
                    <SelectItem value="колбасовидная">{t.sausageShaped}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.contours}</Label>
                <Select value={data.pancreas_contour || ""} onValueChange={(v) => updateField("pancreas_contour", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ровные, чёткие">{t.smooth}</SelectItem>
                    <SelectItem value="неровные">{t.uneven}</SelectItem>
                    <SelectItem value="нечёткие">{t.unclear}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* O'lchamlar */}
            <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">{t.head} ({t.mm})</Label>
                <Input type="number" placeholder="11-32" value={data.pancreas_head || ""} onChange={(e) => updateField("pancreas_head", e.target.value)} className="h-9" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.body} ({t.mm})</Label>
                <Input type="number" placeholder="4-21" value={data.pancreas_body || ""} onChange={(e) => updateField("pancreas_body", e.target.value)} className="h-9" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.tail} ({t.mm})</Label>
                <Input type="number" placeholder="7-35" value={data.pancreas_tail || ""} onChange={(e) => updateField("pancreas_tail", e.target.value)} className="h-9" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.duct} ({t.mm})</Label>
                <Input type="number" placeholder="3-4" value={data.pancreas_duct || ""} onChange={(e) => updateField("pancreas_duct", e.target.value)} className="h-9" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">{t.echostructure}</Label>
                <Select value={data.pancreas_echostructure || ""} onValueChange={(v) => updateField("pancreas_echostructure", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="однородная">{t.homogeneous}</SelectItem>
                    <SelectItem value="неоднородная">{t.heterogeneous}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.echogenicity}</Label>
                <Select value={data.pancreas_echogenicity || ""} onValueChange={(v) => updateField("pancreas_echogenicity", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не повышена (средняя)">{t.normal}</SelectItem>
                    <SelectItem value="повышена">{t.increased}</SelectItem>
                    <SelectItem value="снижена">{t.decreased}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.soundConduction}</Label>
                <Select value={data.pancreas_sound || ""} onValueChange={(v) => updateField("pancreas_sound", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="сохранена">{t.soundGood}</SelectItem>
                    <SelectItem value="снижена">{t.soundDecreased}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ==================== TALOQ ==================== */}
        <AccordionItem value="spleen" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.spleen}
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">{t.shape}</Label>
                <Select value={data.spleen_shape || ""} onValueChange={(v) => updateField("spleen_shape", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="обычная (серповидная)">{t.crescentShape}</SelectItem>
                    <SelectItem value="увеличена">{t.enlarged}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.contours}</Label>
                <Select value={data.spleen_contour || ""} onValueChange={(v) => updateField("spleen_contour", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ровные, чёткие">{t.smooth}</SelectItem>
                    <SelectItem value="неровные">{t.uneven}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.size} ({t.mm})</Label>
                <Input placeholder="100x50" value={data.spleen_size || ""} onChange={(e) => updateField("spleen_size", e.target.value)} className="h-9" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.splenicVein} ({t.mm})</Label>
                <Input type="number" placeholder="5-8" value={data.splenic_vein || ""} onChange={(e) => updateField("splenic_vein", e.target.value)} className="h-9" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">{t.echostructure}</Label>
                <Select value={data.spleen_echostructure || ""} onValueChange={(v) => updateField("spleen_echostructure", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="однородная">{t.homogeneous}</SelectItem>
                    <SelectItem value="неоднородная">{t.heterogeneous}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.echogenicity}</Label>
                <Select value={data.spleen_echogenicity || ""} onValueChange={(v) => updateField("spleen_echogenicity", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не повышена">{t.normal}</SelectItem>
                    <SelectItem value="повышена">{t.increased}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t.veinState}</Label>
                <Select value={data.spleen_vein_state || ""} onValueChange={(v) => updateField("spleen_vein_state", v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="не расширена">{t.notDilated}</SelectItem>
                    <SelectItem value="расширена">{t.dilated}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ==================== BUYRAKLAR ==================== */}
        <AccordionItem value="kidneys" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.kidneys}
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* ===== O'NG BUYRAK ===== */}
              <div className="p-3 border rounded-lg bg-muted/20 space-y-3">
                <h4 className="font-medium text-sm border-b pb-2">{t.rightKidney}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">{t.position}</Label>
                    <Select value={data.kidney_right_position || ""} onValueChange={(v) => updateField("kidney_right_position", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="на обычном месте">{t.usualPlace}</SelectItem>
                        <SelectItem value="опущена">{t.ptosis}</SelectItem>
                        <SelectItem value="дистопия">{t.dystopia}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.mobility}</Label>
                    <Select value={data.kidney_right_mobility || ""} onValueChange={(v) => updateField("kidney_right_mobility", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="сохранена">{t.mobilityPreserved}</SelectItem>
                        <SelectItem value="ограничена">{t.mobilityLimited}</SelectItem>
                        <SelectItem value="отсутствует">{t.mobilityAbsent}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">{t.size} ({t.mm})</Label>
                    <Input placeholder="100x50x45" value={data.kidney_right_size || ""} onChange={(e) => updateField("kidney_right_size", e.target.value)} className="h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.parenchyma} ({t.mm})</Label>
                    <Input placeholder="15-25" value={data.kidney_right_parenchyma || ""} onChange={(e) => updateField("kidney_right_parenchyma", e.target.value)} className="h-8" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">{t.contours}</Label>
                    <Select value={data.kidney_right_contour || ""} onValueChange={(v) => updateField("kidney_right_contour", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ровный, чёткий">{t.smooth}</SelectItem>
                        <SelectItem value="неровный">{t.uneven}</SelectItem>
                        <SelectItem value="нечёткий">{t.unclear}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.parenchymaEcho}</Label>
                    <Select value={data.kidney_right_echo || ""} onValueChange={(v) => updateField("kidney_right_echo", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="однородная, эхогенность не повышена">{t.parenchymaNormal}</SelectItem>
                        <SelectItem value="повышенной эхогенности">{t.parenchymaIncreased}</SelectItem>
                        <SelectItem value="неоднородная">{t.parenchymaHeterogeneous}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">{t.pcs}</Label>
                    <Select value={data.kidney_right_pcs || ""} onValueChange={(v) => updateField("kidney_right_pcs", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="не расширена">{t.pcsNotDilated}</SelectItem>
                        <SelectItem value="расширена">{t.pcsDilated}</SelectItem>
                        <SelectItem value="деформирована">{t.pcsDeformed}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.stonesAndSalts}</Label>
                    <Input placeholder="соли 2-3мм" value={data.kidney_right_stones || ""} onChange={(e) => updateField("kidney_right_stones", e.target.value)} className="h-8" />
                  </div>
                </div>
              </div>

              {/* ===== CHAP BUYRAK ===== */}
              <div className="p-3 border rounded-lg bg-muted/20 space-y-3">
                <h4 className="font-medium text-sm border-b pb-2">{t.leftKidney}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">{t.position}</Label>
                    <Select value={data.kidney_left_position || ""} onValueChange={(v) => updateField("kidney_left_position", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="на обычном месте">{t.usualPlace}</SelectItem>
                        <SelectItem value="опущена">{t.ptosis}</SelectItem>
                        <SelectItem value="дистопия">{t.dystopia}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.mobility}</Label>
                    <Select value={data.kidney_left_mobility || ""} onValueChange={(v) => updateField("kidney_left_mobility", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="сохранена">{t.mobilityPreserved}</SelectItem>
                        <SelectItem value="ограничена">{t.mobilityLimited}</SelectItem>
                        <SelectItem value="отсутствует">{t.mobilityAbsent}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">{t.size} ({t.mm})</Label>
                    <Input placeholder="100x50x45" value={data.kidney_left_size || ""} onChange={(e) => updateField("kidney_left_size", e.target.value)} className="h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.parenchyma} ({t.mm})</Label>
                    <Input placeholder="15-25" value={data.kidney_left_parenchyma || ""} onChange={(e) => updateField("kidney_left_parenchyma", e.target.value)} className="h-8" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">{t.contours}</Label>
                    <Select value={data.kidney_left_contour || ""} onValueChange={(v) => updateField("kidney_left_contour", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ровный, чёткий">{t.smooth}</SelectItem>
                        <SelectItem value="неровный">{t.uneven}</SelectItem>
                        <SelectItem value="нечёткий">{t.unclear}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.parenchymaEcho}</Label>
                    <Select value={data.kidney_left_echo || ""} onValueChange={(v) => updateField("kidney_left_echo", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="однородная, эхогенность не повышена">{t.parenchymaNormal}</SelectItem>
                        <SelectItem value="повышенной эхогенности">{t.parenchymaIncreased}</SelectItem>
                        <SelectItem value="неоднородная">{t.parenchymaHeterogeneous}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">{t.pcs}</Label>
                    <Select value={data.kidney_left_pcs || ""} onValueChange={(v) => updateField("kidney_left_pcs", v)}>
                      <SelectTrigger className="h-8"><SelectValue placeholder={t.select} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="не расширена">{t.pcsNotDilated}</SelectItem>
                        <SelectItem value="расширена">{t.pcsDilated}</SelectItem>
                        <SelectItem value="деформирована">{t.pcsDeformed}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t.stonesAndSalts}</Label>
                    <Input placeholder="соли 2-3мм" value={data.kidney_left_stones || ""} onChange={(e) => updateField("kidney_left_stones", e.target.value)} className="h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Qo'shimcha - Erkin suyuqlik */}
            <div className="space-y-2 pt-2 border-t">
              <Label className="text-xs">{t.freeFluid}</Label>
              <Select value={data.free_fluid || ""} onValueChange={(v) => updateField("free_fluid", v)}>
                <SelectTrigger className="h-9"><SelectValue placeholder={t.select} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="не выявлено">{t.notRevealed}</SelectItem>
                  <SelectItem value="незначительное количество">{t.insignificant}</SelectItem>
                  <SelectItem value="умеренное количество">{t.moderate}</SelectItem>
                  <SelectItem value="значительное количество">{t.significant}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
