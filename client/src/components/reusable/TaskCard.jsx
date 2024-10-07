import Icon from "@reusable/Icon";

export default function TaskCard() {
  return (
    <div className="task-card-container">
      <div className="left">
        <h4>Task name</h4>
        <p>Task description</p>
        <p>Task deadlines</p>

        <div className="task-category">🏠 Home</div>
      </div>

      <div className="right">
        <p>current time</p>
        <Icon library="pi" name="PiDotsThreeOutlineVertical" />
      </div>
    </div>
  );
}
