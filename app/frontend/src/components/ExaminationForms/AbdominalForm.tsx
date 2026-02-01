/**
 * Qorin bo'shlig'i UZI formasi - Брюшное
 * DRY: Umumiy tarjimalardan foydalanadi
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
import { Separator } from "@/components/ui/separator"
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
    <div className="space-y-6">
      {/* JIGAR */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t.liver}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>{t.kvrRight} ({t.mm})</Label>
            <Input type="number" placeholder={`${t.norm} 150-160`} value={data.liver_kvr_right || ""} onChange={(e) => updateField("liver_kvr_right", e.target.value)} />
            <span className="text-xs text-muted-foreground">{t.norm} 150-160</span>
          </div>
          <div className="space-y-2">
            <Label>{t.kvrLeft} ({t.mm})</Label>
            <Input type="number" placeholder={`${t.norm} 100`} value={data.liver_kvr_left || ""} onChange={(e) => updateField("liver_kvr_left", e.target.value)} />
            <span className="text-xs text-muted-foreground">{t.norm} 100</span>
          </div>
          <div className="space-y-2">
            <Label>{t.pzr} ({t.mm})</Label>
            <Input type="number" placeholder={`${t.norm} 125`} value={data.liver_pzr || ""} onChange={(e) => updateField("liver_pzr", e.target.value)} />
            <span className="text-xs text-muted-foreground">{t.norm} 125</span>
          </div>
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
                <SelectItem value="средняя">{t.medium} ({t.norm})</SelectItem>
                <SelectItem value="повышена">{t.increased}</SelectItem>
                <SelectItem value="снижена">{t.decreased}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Tomirlar */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="space-y-2">
            <Label>{t.portalVein} ({t.mm})</Label>
            <Input type="number" placeholder={`${t.norm} 7-14`} value={data.portal_vein || ""} onChange={(e) => updateField("portal_vein", e.target.value)} />
            <span className="text-xs text-muted-foreground">{t.norm} 7-14</span>
          </div>
          <div className="space-y-2">
            <Label>{t.ivc} ({t.mm})</Label>
            <Input type="number" placeholder={`${t.norm} 12-23`} value={data.ivc || ""} onChange={(e) => updateField("ivc", e.target.value)} />
            <span className="text-xs text-muted-foreground">{t.norm} 12-23</span>
          </div>
          <div className="space-y-2">
            <Label>{t.choledoch} ({t.mm})</Label>
            <Input type="number" placeholder={`${t.norm} 6-8`} value={data.choledoch || ""} onChange={(e) => updateField("choledoch", e.target.value)} />
            <span className="text-xs text-muted-foreground">{t.norm} 6-8</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* O'T PUFAGI */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t.gallbladder}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>{t.size} ({t.mm})</Label>
            <Input placeholder={t.lengthWidth} value={data.gallbladder_size || ""} onChange={(e) => updateField("gallbladder_size", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{t.wallThickness} ({t.mm})</Label>
            <Input type="number" placeholder={`${t.norm} 1-2`} value={data.gallbladder_wall || ""} onChange={(e) => updateField("gallbladder_wall", e.target.value)} />
            <span className="text-xs text-muted-foreground">{t.norm} 1-2</span>
          </div>
          <div className="space-y-2">
            <Label>{t.content}</Label>
            <Select value={data.gallbladder_content || ""} onValueChange={(v) => updateField("gallbladder_content", v)}>
              <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="гомогенное">{t.homogeneousContent} ({t.norm})</SelectItem>
                <SelectItem value="негомогенное">{t.heterogeneousContent}</SelectItem>
                <SelectItem value="с осадком">{t.withSediment}</SelectItem>
                <SelectItem value="конкременты">{t.stones}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* OSHQOZON OSTI BEZI */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t.pancreas}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>{t.head} ({t.mm})</Label>
            <Input type="number" placeholder={`${t.norm} 11-32`} value={data.pancreas_head || ""} onChange={(e) => updateField("pancreas_head", e.target.value)} />
            <span className="text-xs text-muted-foreground">{t.norm} 11-32</span>
          </div>
          <div className="space-y-2">
            <Label>{t.body} ({t.mm})</Label>
            <Input type="number" placeholder={`${t.norm} 4-21`} value={data.pancreas_body || ""} onChange={(e) => updateField("pancreas_body", e.target.value)} />
            <span className="text-xs text-muted-foreground">{t.norm} 4-21</span>
          </div>
          <div className="space-y-2">
            <Label>{t.tail} ({t.mm})</Label>
            <Input type="number" placeholder={`${t.norm} 7-35`} value={data.pancreas_tail || ""} onChange={(e) => updateField("pancreas_tail", e.target.value)} />
            <span className="text-xs text-muted-foreground">{t.norm} 7-35</span>
          </div>
          <div className="space-y-2">
            <Label>{t.wirsungDuct} ({t.mm})</Label>
            <Input type="number" placeholder={`${t.norm} 3-4`} value={data.pancreas_duct || ""} onChange={(e) => updateField("pancreas_duct", e.target.value)} />
            <span className="text-xs text-muted-foreground">{t.norm} 3-4</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
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
      </div>

      <Separator />

      {/* TALOQ */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t.spleen}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>{t.length} ({t.mm})</Label>
            <Input type="number" placeholder={`${t.norm} 90-125`} value={data.spleen_length || ""} onChange={(e) => updateField("spleen_length", e.target.value)} />
            <span className="text-xs text-muted-foreground">{t.norm} 90-125</span>
          </div>
          <div className="space-y-2">
            <Label>{t.width} ({t.mm})</Label>
            <Input type="number" placeholder={`${t.norm} 50-70`} value={data.spleen_width || ""} onChange={(e) => updateField("spleen_width", e.target.value)} />
            <span className="text-xs text-muted-foreground">{t.norm} 50-70</span>
          </div>
          <div className="space-y-2">
            <Label>{t.splenicVein} ({t.mm})</Label>
            <Input type="number" value={data.splenic_vein || ""} onChange={(e) => updateField("splenic_vein", e.target.value)} />
          </div>
        </div>
      </div>

      <Separator />

      {/* BUYRAKLAR */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t.kidneys}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* O'ng buyrak */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h4 className="font-medium">{t.rightKidney}</h4>
            <div className="space-y-2">
              <Label>{t.size} ({t.mm})</Label>
              <Input placeholder={t.lengthWidthThickness} value={data.kidney_right_size || ""} onChange={(e) => updateField("kidney_right_size", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t.parenchyma} ({t.mm})</Label>
              <Input type="number" placeholder={`${t.norm} 15-25`} value={data.kidney_right_parenchyma || ""} onChange={(e) => updateField("kidney_right_parenchyma", e.target.value)} />
            </div>
          </div>
          
          {/* Chap buyrak */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h4 className="font-medium">{t.leftKidney}</h4>
            <div className="space-y-2">
              <Label>{t.size} ({t.mm})</Label>
              <Input placeholder={t.lengthWidthThickness} value={data.kidney_left_size || ""} onChange={(e) => updateField("kidney_left_size", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t.parenchyma} ({t.mm})</Label>
              <Input type="number" placeholder={`${t.norm} 15-25`} value={data.kidney_left_parenchyma || ""} onChange={(e) => updateField("kidney_left_parenchyma", e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
