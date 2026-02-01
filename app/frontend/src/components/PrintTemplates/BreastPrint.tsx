import type { ExaminationData } from "./PrintLayout"

interface BreastPrintProps {
  data: ExaminationData
}

export function BreastPrint({ data }: BreastPrintProps) {
  return (
    <div className="space-y-4">
      {/* O'ng sut bezi */}
      {data.right_thickness && (
        <div>
          <h4 className="font-bold text-primary">ПРАВАЯ МОЛОЧНАЯ ЖЕЛЕЗА:</h4>
          <p>
            Толщина: {data.right_thickness} мм.
            {data.right_structure && ` Тип строения: ${data.right_structure}.`}
            {data.right_ducts && ` Протоки: ${data.right_ducts}.`}
            {data.right_lesions === "есть" && ` Образование: ${data.right_lesion_size}, ${data.right_lesion_type}, контуры ${data.right_lesion_margins}.`}
            {data.right_birads && ` BI-RADS ${data.right_birads}.`}
          </p>
        </div>
      )}

      {/* Chap sut bezi */}
      {data.left_thickness && (
        <div>
          <h4 className="font-bold text-primary">ЛЕВАЯ МОЛОЧНАЯ ЖЕЛЕЗА:</h4>
          <p>
            Толщина: {data.left_thickness} мм.
            {data.left_structure && ` Тип строения: ${data.left_structure}.`}
            {data.left_ducts && ` Протоки: ${data.left_ducts}.`}
            {data.left_lesions === "есть" && ` Образование: ${data.left_lesion_size}, ${data.left_lesion_type}, контуры ${data.left_lesion_margins}.`}
            {data.left_birads && ` BI-RADS ${data.left_birads}.`}
          </p>
        </div>
      )}

      {/* Limfa tugunlari */}
      {(data.right_axillary_ln || data.left_axillary_ln) && (
        <div>
          <h4 className="font-bold text-primary">РЕГИОНАРНЫЕ ЛИМФОУЗЛЫ:</h4>
          <p>
            {data.right_axillary_ln && `Справа: ${data.right_axillary_ln}. `}
            {data.left_axillary_ln && `Слева: ${data.left_axillary_ln}.`}
          </p>
        </div>
      )}
    </div>
  )
}
