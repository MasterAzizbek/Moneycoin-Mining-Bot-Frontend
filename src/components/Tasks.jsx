import { useEffect, useState, useContext } from "react";
import DataContext from "../context/context";
import { toast } from "react-toastify";

function Tasks() {
  const API_URL = "https://azizbekaliyev.uz/api/v1/authenticate";
  const [tasks, setTasks] = useState({});
  const { user, getBlum } = useContext(DataContext);

  const success = (task_name, amount) => {
    toast.success(
      `Task "${task_name}" successfuly completed. Gift ${amount} MC`
    );
  };

  const pooling = () => {
    get_tasks();

    setInterval(get_tasks, 5000);
  };

  const get_tasks = async () => {
    try {
      const response = await fetch(`${API_URL}/get_tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.telegram_id,
        }),
      });

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Handle error state if needed
    }
  };

  const handleStart = async (task_id, taskUrl) => {
    window.location.href = taskUrl;
    const response = await fetch(`${API_URL}/start_task/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.telegram_id,
        task_id: task_id,
      }),
    });

    console.log(response.json());
    await getBlum();
    isfinished();
  };

  useEffect(() => {
    get_tasks();
  }, [tasks, user]);

  return (
    <div className="Tasks">
      <div className="tasks_top">
        <h3 className="tasks_title">
          Tasks <span className="badge">{tasks.length}</span>
        </h3>
        <p className="tasks_text">
          We will reward you immediately with points after each task completion
          .
        </p>
      </div>
      <div className="tasks_bottom">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="task_card" key={task.id}>
              <div className="task_left">
                <i className="bx bx-task"></i>
                <div className="title_box">
                  <h6 className="task_card_title">{task.task_name}</h6>
                  <p className="task_card_text">+{task.task_prize_amount} BP</p>
                </div>
              </div>
              {task.is_claimed == true ? (
                <button className="btn_check">
                  <i class="bx bx-check-circle"></i>
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleStart(
                      task.id,
                      task.task_url,
                      task.task_name,
                      task.task_prize_amount
                    )
                  }
                >
                  Start
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
}

export default Tasks;
