fetch("../data/data.json")
  .then(res => res.json())
  .then(tasks => {
    const dataForPivot = tasks.map(task => ({
      ...task,
      isDone: task.isDone ? "Виконано" : "Не виконано",
    }));
    new WebDataRocks({
      container: "#pivot-container",
      toolbar: true,
      height: 600,
      report: {
        dataSource: {
            data: dataForPivot
        },
        slice: {
            rows: [
                { uniqueName: "name" },
                { uniqueName: "date.Day" },
                { uniqueName: "date.Month" },
                { uniqueName: "date.Year" },
                { uniqueName: "priority" },
                { uniqueName: "isDone" }
            ],
            columns: [],
            measures: [],
        },
        options: {
          grid: {
            type: "flat",
            showHeaders: true,
            showGrandTotals: "on" 
          }
        }
      }
    });
  })
  .catch(e => console.error("Failed to load JSON", e));