import type { ExaminationData } from "./PrintLayout"

interface ThyroidPrintProps {
  data: ExaminationData
}

export function ThyroidPrint({ data }: ThyroidPrintProps) {
  return (
    <div className="space-y-4">
      {/* O'ng bo'lak */}
      {data.right_length && (
        <div>
          <h4 className="font-bold text-primary">ПРАВАЯ ДОЛЯ:</h4>
          <p>
            Размеры: {data.right_length} x {data.right_width} x {data.right_thickness} мм.
            {data.right_contours && ` Контуры: ${data.right_contours}.`}
            {data.right_echogenicity && ` Эхогенность: ${data.right_echogenicity}.`}
            {data.right_structure && ` Структура: ${data.right_structure}.`}
            {data.right_nodules === "есть" && ` Узлы: ${data.right_nodule_size}, ${data.right_nodule_echo}.`}
          </p>
        </div>
      )}

      {/* Chap bo'lak */}
      {data.left_length && (
        <div>
          <h4 className="font-bold text-primary">ЛЕВАЯ ДОЛЯ:</h4>
          <p>
            Размеры: {data.left_length} x {data.left_width} x {data.left_thickness} мм.
            {data.left_contours && ` Контуры: ${data.left_contours}.`}
            {data.left_echogenicity && ` Эхогенность: ${data.left_echogenicity}.`}
            {data.left_structure && ` Структура: ${data.left_structure}.`}
            {data.left_nodules === "есть" && ` Узлы: ${data.left_nodule_size}, ${data.left_nodule_echo}.`}
          </p>
        </div>
      )}

      {/* Pereshek */}
      {data.isthmus_thickness && (
        <div>
          <h4 className="font-bold text-primary">ПЕРЕШЕЕК:</h4>
          <p>
            Толщина: {data.isthmus_thickness} мм.
            {data.isthmus_structure && ` Структура: ${data.isthmus_structure}.`}
          </p>
        </div>
      )}

      {/* Umumiy ma'lumotlar */}
      <div>
        <p>
          {data.lymph_nodes && `Регионарные лимфоузлы: ${data.lymph_nodes}. `}
          {data.blood_flow && `Кровоток (ЦДК): ${data.blood_flow}. `}
          {data.tirads && `TI-RADS: ${data.tirads}.`}
        </p>
      </div>
    </div>
  )
}
