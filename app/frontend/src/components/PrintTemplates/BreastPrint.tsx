import type { ExaminationData } from "./PrintLayout"

interface BreastPrintProps {
  data: ExaminationData
}

export function BreastPrint({ data }: BreastPrintProps) {
  return (
    <div className="space-y-3 text-[11pt]">
      {/* Umumiy ma'lumotlar */}
      <div>
        <p className="leading-relaxed">
          День ПМЦ: {data.pmc_day || "___________"}{" "}
          УЗ-датчик: {data.sensor || "линейный мультичастотный"}
        </p>
      </div>

      {/* Umumiy ko'rinish */}
      <div>
        <p className="leading-relaxed">
          Молочные железы {data.symmetry || "симметричны"}. 
          Кожа {data.skin || "без УЗ-признаков патологии"}. 
          Дифференциация тканей {data.tissue_diff || "хорошая"}. 
          Жировая ткань {data.fat_tissue || "выражена умеренно"}. 
          Связки Купера {data.cooper_ligaments || "дифференцируются"}. 
          Соски, ареола {data.nipple_areola || "без особенностей"}.
        </p>
      </div>

      {/* Bez to'qimasi */}
      <div>
        <h4 className="font-bold text-primary">ЖЕЛЕЗИСТАЯ ТКАНЬ:</h4>
        <p className="leading-relaxed">
          представлена {data.tissue_type || "единым пластом (возрастная норма)"}; 
          толщина справа – {data.thickness_right || "___"} мм, 
          слева – {data.thickness_left || "___"} мм; 
          эхогенность {data.tissue_echogenicity || "умеренно повышена"}.
        </p>
      </div>

      {/* Sut yo'llari */}
      <div>
        <h4 className="font-bold text-primary">МЛЕЧНЫЕ ПРОТОКИ:</h4>
        <p className="leading-relaxed">
          {data.milk_ducts || "не расширены"}
          {data.duct_diameter && `, диаметр ${data.duct_diameter} мм`}; 
          стенки {data.duct_walls || "не уплотнены"}; 
          протоковая система {data.duct_system || "соответствует возрастной норме"}.
        </p>
      </div>

      {/* O'ng sut bezi */}
      <div>
        <h4 className="font-bold text-primary">ПРАВАЯ МОЛОЧНАЯ ЖЕЛЕЗА:</h4>
        <p className="leading-relaxed">
          Дифференциация паренхимы – {data.right_parenchyma_diff || "умеренно диффузно повышена"}. 
          Сосок – {data.right_nipple || "форма округлая, контур ровный, структура однородная, эхогенность средняя"}. 
          Жировая клетчатка – {data.right_fat_layer || "без особенностей"}. 
          Эхогенность – {data.right_echogenicity || "средняя"}. 
          Визуализация протоков – {data.right_ducts_visualization || "визуализируются"}. 
          Состояние протоков – {data.right_ducts_phase || "1 фаза МЦ"}. 
          Позадисосковая область – {data.right_retronipple || "без особенностей"}. 
          Сосудистый рисунок – {data.right_vascular_pattern || "не усилен"}. 
          Очаговые изменения – {data.right_focal_changes || "не обнаружено"}.
          {data.right_focal_changes === "обнаружено" && data.right_lesion_details && ` ${data.right_lesion_details}.`}
          {" "}Ретромаммарное пространство – {data.right_retromammary || "свободно"}.
        </p>
      </div>

      {/* Chap sut bezi */}
      <div>
        <h4 className="font-bold text-primary">ЛЕВАЯ МОЛОЧНАЯ ЖЕЛЕЗА:</h4>
        <p className="leading-relaxed">
          Дифференциация паренхимы – {data.left_parenchyma_diff || "умеренно диффузно повышена"}. 
          Сосок – {data.left_nipple || "форма округлая, контур ровный, структура однородная, эхогенность средняя"}. 
          Жировая клетчатка – {data.left_fat_layer || "без особенностей"}. 
          Эхогенность – {data.left_echogenicity || "средняя"}. 
          Визуализация протоков – {data.left_ducts_visualization || "визуализируются"}. 
          Состояние протоков – {data.left_ducts_phase || "1 фаза МЦ"}. 
          Позадисосковая область – {data.left_retronipple || "без особенностей"}. 
          Сосудистый рисунок – {data.left_vascular_pattern || "не усилен"}. 
          Очаговые изменения – {data.left_focal_changes || "не обнаружено"}.
          {data.left_focal_changes === "обнаружено" && data.left_lesion_details && ` ${data.left_lesion_details}.`}
          {" "}Ретромаммарное пространство – {data.left_retromammary || "свободно"}.
        </p>
      </div>

      {/* Regional limfa tugunlari */}
      <div>
        <h4 className="font-bold text-primary">РЕГИОНАРНЫЕ ЗОНЫ ЛИМФООТТОКА:</h4>
        <p className="leading-relaxed">
          Надключичная зона – {data.ln_supraclavicular || "без особенностей"}. 
          Подключичная зона – {data.ln_subclavicular || "без особенностей"}. 
          Передне-грудная зона – {data.ln_anterior_chest || "без особенностей"}.
        </p>
      </div>

      {/* Qo'ltiq osti limfa tugunlari */}
      <div>
        <h4 className="font-bold text-primary">ПОДМЫШЕЧНЫЕ ЛИМФОУЗЛЫ:</h4>
        <p className="leading-relaxed">
          Справа: {data.right_axillary_status || "визуализируются"}
          {data.right_axillary_size1 && data.right_axillary_size2 && `, ${data.right_axillary_size1}x${data.right_axillary_size2} мм`}
          {data.right_axillary_shape && `, форма ${data.right_axillary_shape}`}
          {data.right_axillary_contours && `, контуры ${data.right_axillary_contours}`}
          {data.right_axillary_echogenicity && `, ${data.right_axillary_echogenicity}`}. 
          Слева: {data.left_axillary_status || "визуализируются"}
          {data.left_axillary_size1 && data.left_axillary_size2 && `, ${data.left_axillary_size1}x${data.left_axillary_size2} мм`}
          {data.left_axillary_shape && `, форма ${data.left_axillary_shape}`}
          {data.left_axillary_contours && `, контуры ${data.left_axillary_contours}`}
          {data.left_axillary_echogenicity && `, ${data.left_axillary_echogenicity}`}.
        </p>
      </div>

      {/* BI-RADS */}
      {data.birads && (
        <div>
          <h4 className="font-bold text-primary">КЛАССИФИКАЦИЯ:</h4>
          <p className="leading-relaxed font-semibold">
            {data.birads}
          </p>
        </div>
      )}
    </div>
  )
}
