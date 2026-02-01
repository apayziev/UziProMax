/**
 * Qorin bo'shlig'i UZI formasi - Брюшное
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

interface AbdominalFormProps {
  data: Record<string, any>
  onChange: (data: Record<string, any>) => void
}

export function AbdominalForm({ data, onChange }: AbdominalFormProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      {/* JIGAR - ПЕЧЕНЬ */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ПЕЧЕНЬ (Jigar)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>КВР правой доли (мм)</Label>
            <Input
              type="number"
              placeholder="норма до 150"
              value={data.liver_kvr_right || ""}
              onChange={(e) => updateField("liver_kvr_right", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма до 150-160</span>
          </div>
          <div className="space-y-2">
            <Label>КВР левой доли (мм)</Label>
            <Input
              type="number"
              placeholder="норма до 100"
              value={data.liver_kvr_left || ""}
              onChange={(e) => updateField("liver_kvr_left", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма до 100</span>
          </div>
          <div className="space-y-2">
            <Label>ПЗР (мм)</Label>
            <Input
              type="number"
              placeholder="норма до 125"
              value={data.liver_pzr || ""}
              onChange={(e) => updateField("liver_pzr", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма до 125</span>
          </div>
          <div className="space-y-2">
            <Label>Контуры</Label>
            <Select
              value={data.liver_contour || ""}
              onValueChange={(v) => updateField("liver_contour", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ровные, четкие">ровные, четкие</SelectItem>
                <SelectItem value="неровные">неровные</SelectItem>
                <SelectItem value="нечеткие">нечеткие</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Эхоструктура</Label>
            <Select
              value={data.liver_echostructure || ""}
              onValueChange={(v) => updateField("liver_echostructure", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="однородная">однородная</SelectItem>
                <SelectItem value="неоднородная">неоднородная</SelectItem>
                <SelectItem value="диффузно неоднородная">диффузно неоднородная</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Эхогенность</Label>
            <Select
              value={data.liver_echogenicity || ""}
              onValueChange={(v) => updateField("liver_echogenicity", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="средняя">средняя (норма)</SelectItem>
                <SelectItem value="повышена">повышена</SelectItem>
                <SelectItem value="снижена">снижена</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Tomirlar */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="space-y-2">
            <Label>V. portae (мм)</Label>
            <Input
              type="number"
              placeholder="норма 7-14"
              value={data.portal_vein || ""}
              onChange={(e) => updateField("portal_vein", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма 7-14</span>
          </div>
          <div className="space-y-2">
            <Label>НПВ (I.V.C) (мм)</Label>
            <Input
              type="number"
              placeholder="норма 12-23"
              value={data.ivc || ""}
              onChange={(e) => updateField("ivc", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма 12-23</span>
          </div>
          <div className="space-y-2">
            <Label>Холедох (мм)</Label>
            <Input
              type="number"
              placeholder="норма до 6-8"
              value={data.choledoch || ""}
              onChange={(e) => updateField("choledoch", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма до 6-8</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* O'T PUFAGI - ЖЕЛЧНЫЙ ПУЗЫРЬ */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ЖЕЛЧНЫЙ ПУЗЫРЬ (O't pufagi)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Размеры (мм)</Label>
            <Input
              placeholder="длина х ширина"
              value={data.gallbladder_size || ""}
              onChange={(e) => updateField("gallbladder_size", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Толщина стенки (мм)</Label>
            <Input
              type="number"
              placeholder="норма 1-2"
              value={data.gallbladder_wall || ""}
              onChange={(e) => updateField("gallbladder_wall", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма 1-2</span>
          </div>
          <div className="space-y-2">
            <Label>Содержимое</Label>
            <Select
              value={data.gallbladder_content || ""}
              onValueChange={(v) => updateField("gallbladder_content", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="гомогенное">гомогенное (норма)</SelectItem>
                <SelectItem value="негомогенное">негомогенное</SelectItem>
                <SelectItem value="с осадком">с осадком</SelectItem>
                <SelectItem value="конкременты">конкременты</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* OSHQOZON OSTI BEZI - ПОДЖЕЛУДОЧНАЯ ЖЕЛЕЗА */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ПОДЖЕЛУДОЧНАЯ ЖЕЛЕЗА (Oshqozon osti bezi)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Головка (мм)</Label>
            <Input
              type="number"
              placeholder="норма 11-32"
              value={data.pancreas_head || ""}
              onChange={(e) => updateField("pancreas_head", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма 11-32</span>
          </div>
          <div className="space-y-2">
            <Label>Тело (мм)</Label>
            <Input
              type="number"
              placeholder="норма 4-21"
              value={data.pancreas_body || ""}
              onChange={(e) => updateField("pancreas_body", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма 4-21</span>
          </div>
          <div className="space-y-2">
            <Label>Хвост (мм)</Label>
            <Input
              type="number"
              placeholder="норма 7-35"
              value={data.pancreas_tail || ""}
              onChange={(e) => updateField("pancreas_tail", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма 7-35</span>
          </div>
          <div className="space-y-2">
            <Label>Вирсунгов проток (мм)</Label>
            <Input
              type="number"
              placeholder="норма 3-4"
              value={data.pancreas_duct || ""}
              onChange={(e) => updateField("pancreas_duct", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма 3-4</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Контуры</Label>
            <Select
              value={data.pancreas_contour || ""}
              onValueChange={(v) => updateField("pancreas_contour", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ровные, четкие">ровные, четкие</SelectItem>
                <SelectItem value="неровные">неровные</SelectItem>
                <SelectItem value="нечеткие">нечеткие</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Эхоструктура</Label>
            <Select
              value={data.pancreas_echostructure || ""}
              onValueChange={(v) => updateField("pancreas_echostructure", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="однородная">однородная</SelectItem>
                <SelectItem value="неоднородная">неоднородная</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* TALOQ - СЕЛЕЗЕНКА */}
      <div>
        <h3 className="text-lg font-semibold mb-4">СЕЛЕЗЕНКА (Taloq)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Длина (мм)</Label>
            <Input
              type="number"
              placeholder="норма 90-125"
              value={data.spleen_length || ""}
              onChange={(e) => updateField("spleen_length", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма 90-125</span>
          </div>
          <div className="space-y-2">
            <Label>Ширина (мм)</Label>
            <Input
              type="number"
              placeholder="норма 50-70"
              value={data.spleen_width || ""}
              onChange={(e) => updateField("spleen_width", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма 50-70</span>
          </div>
          <div className="space-y-2">
            <Label>Селезеночная вена (мм)</Label>
            <Input
              type="number"
              value={data.splenic_vein || ""}
              onChange={(e) => updateField("splenic_vein", e.target.value)}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* BUYRAKLAR - ПОЧКИ */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ПОЧКИ (Buyraklar)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* O'ng buyrak */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h4 className="font-medium">Правая почка (O'ng)</h4>
            <div className="space-y-2">
              <Label>Размеры (мм)</Label>
              <Input
                placeholder="длина х ширина х толщина"
                value={data.kidney_right_size || ""}
                onChange={(e) => updateField("kidney_right_size", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Паренхима (мм)</Label>
              <Input
                type="number"
                placeholder="норма 15-25"
                value={data.kidney_right_parenchyma || ""}
                onChange={(e) => updateField("kidney_right_parenchyma", e.target.value)}
              />
            </div>
          </div>
          
          {/* Chap buyrak */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h4 className="font-medium">Левая почка (Chap)</h4>
            <div className="space-y-2">
              <Label>Размеры (мм)</Label>
              <Input
                placeholder="длина х ширина х толщина"
                value={data.kidney_left_size || ""}
                onChange={(e) => updateField("kidney_left_size", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Паренхима (мм)</Label>
              <Input
                type="number"
                placeholder="норма 15-25"
                value={data.kidney_left_parenchyma || ""}
                onChange={(e) => updateField("kidney_left_parenchyma", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
