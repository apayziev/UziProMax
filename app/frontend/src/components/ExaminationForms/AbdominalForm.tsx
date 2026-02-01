/**
 * Qorin bo'shlig'i UZI formasi - Брюшное
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
        {/* JIGAR */}
        <AccordionItem value="liver" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.liver}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            {/* 1-qator: O'lchamlar */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label>{t.kvrRight} ({t.mm})</Label>
                <Input type="number" placeholder="150-160" value={data.liver_kvr_right || ""} onChange={(e) => updateField("liver_kvr_right", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.kvrLeft} ({t.mm})</Label>
                <Input type="number" placeholder="< 100" value={data.liver_kvr_left || ""} onChange={(e) => updateField("liver_kvr_left", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.pzr} ({t.mm})</Label>
                <Input type="number" placeholder="< 125" value={data.liver_pzr || ""} onChange={(e) => updateField("liver_pzr", e.target.value)} />
              </div>
            </div>
            {/* 2-qator: Sifat ko'rsatkichlari */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="space-y-2">
                <Label>{t.contours}</Label>
                <Select value={data.liver_contour || ""} onValueChange={(v) => updateField("liver_contour", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ровные, четкие">{t.smooth}</SelectItem>
                    <SelectItem value="неровные">{t.uneven}</SelectItem>
                    <SelectItem value="нечеткие">{t.unclear}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.echostructure}</Label>
                <Select value={data.liver_echostructure || ""} onValueChange={(v) => updateField("liver_echostructure", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="однородная">{t.homogeneous}</SelectItem>
                    <SelectItem value="неоднородная">{t.heterogeneous}</SelectItem>
                    <SelectItem value="диффузно неоднородная">{t.diffuseHeterogeneous}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.echogenicity}</Label>
                <Select value={data.liver_echogenicity || ""} onValueChange={(v) => updateField("liver_echogenicity", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="средняя">{t.medium}</SelectItem>
                    <SelectItem value="повышена">{t.increased}</SelectItem>
                    <SelectItem value="снижена">{t.decreased}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Tomirlar */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-4 pt-4 border-t">
              <div className="space-y-2">
                <Label>{t.portalVein} ({t.mm})</Label>
                <Input type="number" placeholder="7-14" value={data.portal_vein || ""} onChange={(e) => updateField("portal_vein", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.ivc} ({t.mm})</Label>
                <Input type="number" placeholder="12-23" value={data.ivc || ""} onChange={(e) => updateField("ivc", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.choledoch} ({t.mm})</Label>
                <Input type="number" placeholder="6-8" value={data.choledoch || ""} onChange={(e) => updateField("choledoch", e.target.value)} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* O'T PUFAGI */}
        <AccordionItem value="gallbladder" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.gallbladder}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label>{t.size} ({t.mm})</Label>
                <Input placeholder={t.lengthWidth} value={data.gallbladder_size || ""} onChange={(e) => updateField("gallbladder_size", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.wallThickness} ({t.mm})</Label>
                <Input type="number" placeholder="1-2" value={data.gallbladder_wall || ""} onChange={(e) => updateField("gallbladder_wall", e.target.value)} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>{t.content}</Label>
                <Select value={data.gallbladder_content || ""} onValueChange={(v) => updateField("gallbladder_content", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="гомогенное">{t.homogeneousContent}</SelectItem>
                    <SelectItem value="негомогенное">{t.heterogeneousContent}</SelectItem>
                    <SelectItem value="с осадком">{t.withSediment}</SelectItem>
                    <SelectItem value="конкременты">{t.stones}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* OSHQOZON OSTI BEZI */}
        <AccordionItem value="pancreas" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.pancreas}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
              <div className="space-y-2">
                <Label>{t.head} ({t.mm})</Label>
                <Input type="number" placeholder="11-32" value={data.pancreas_head || ""} onChange={(e) => updateField("pancreas_head", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.body} ({t.mm})</Label>
                <Input type="number" placeholder="4-21" value={data.pancreas_body || ""} onChange={(e) => updateField("pancreas_body", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.tail} ({t.mm})</Label>
                <Input type="number" placeholder="7-35" value={data.pancreas_tail || ""} onChange={(e) => updateField("pancreas_tail", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.wirsungDuct} ({t.mm})</Label>
                <Input type="number" placeholder="< 3-4" value={data.pancreas_duct || ""} onChange={(e) => updateField("pancreas_duct", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="space-y-2">
                <Label>{t.contours}</Label>
                <Select value={data.pancreas_contour || ""} onValueChange={(v) => updateField("pancreas_contour", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ровные, четкие">{t.smooth}</SelectItem>
                    <SelectItem value="неровные">{t.uneven}</SelectItem>
                    <SelectItem value="нечеткие">{t.unclear}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.echostructure}</Label>
                <Select value={data.pancreas_echostructure || ""} onValueChange={(v) => updateField("pancreas_echostructure", v)}>
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

        {/* TALOQ */}
        <AccordionItem value="spleen" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.spleen}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              <div className="space-y-2">
                <Label>{t.length} ({t.mm})</Label>
                <Input type="number" placeholder="90-125" value={data.spleen_length || ""} onChange={(e) => updateField("spleen_length", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.width} ({t.mm})</Label>
                <Input type="number" placeholder="50-70" value={data.spleen_width || ""} onChange={(e) => updateField("spleen_width", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.splenicVein} ({t.mm})</Label>
                <Input type="number" value={data.splenic_vein || ""} onChange={(e) => updateField("splenic_vein", e.target.value)} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* BUYRAKLAR */}
        <AccordionItem value="kidneys" className="border rounded-lg px-4">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {t.kidneys}
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* O'ng buyrak */}
              <div className="space-y-3 p-3 border rounded-lg bg-muted/20">
                <h4 className="font-medium text-sm">{t.rightKidney}</h4>
                <div className="space-y-2">
                  <Label className="text-xs">{t.size} ({t.mm})</Label>
                  <Input placeholder={t.lengthWidthThickness} value={data.kidney_right_size || ""} onChange={(e) => updateField("kidney_right_size", e.target.value)} className="h-9" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">{t.parenchyma} ({t.mm})</Label>
                  <Input type="number" placeholder="15-25" value={data.kidney_right_parenchyma || ""} onChange={(e) => updateField("kidney_right_parenchyma", e.target.value)} className="h-9" />
                </div>
              </div>
              
              {/* Chap buyrak */}
              <div className="space-y-3 p-3 border rounded-lg bg-muted/20">
                <h4 className="font-medium text-sm">{t.leftKidney}</h4>
                <div className="space-y-2">
                  <Label className="text-xs">{t.size} ({t.mm})</Label>
                  <Input placeholder={t.lengthWidthThickness} value={data.kidney_left_size || ""} onChange={(e) => updateField("kidney_left_size", e.target.value)} className="h-9" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">{t.parenchyma} ({t.mm})</Label>
                  <Input type="number" placeholder="15-25" value={data.kidney_left_parenchyma || ""} onChange={(e) => updateField("kidney_left_parenchyma", e.target.value)} className="h-9" />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
