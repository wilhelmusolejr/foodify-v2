import { faQuestion, faSpoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MealTypeItem({ mealTypeName = "loading", mealNum = 0 }) {
  let icon = mealNum > 0 ? faSpoon : faQuestion;

  return (
    <li className="flex items-center justify-between">
      <div className="flex gap-1 items-center">
        <FontAwesomeIcon icon={icon} size="xs" />
        <span className="text-gray-700">{mealTypeName}</span>
      </div>
      <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">{mealNum}</span>
    </li>
  );
}
