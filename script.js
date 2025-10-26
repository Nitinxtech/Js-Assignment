$(document).ready(function () {
  const modal = $("#employeeModal");
  const closeBtn = $(".close");

  displayEmployees(manager.employees);

  // Display Employees
  function displayEmployees(list) {
    $("#employeeList").empty();
    list.forEach(emp => {
      $("#employeeList").append(`
        <div class="employee-card" data-id="${emp.id}">
          <button class="delete-btn" data-id="${emp.id}">×</button>
          <h3>${emp.name}</h3>
          <p><strong>💼</strong> ${emp.position}</p>
          <p><strong>📧</strong> ${emp.email}</p>
        </div>
      `);
    });
  }

  // Search
  $("#searchBox").on("input", function () {
    const query = $(this).val();
    const filtered = manager.filterEmployees(query);
    displayEmployees(filtered);
  });

  // Modal View
  $(document).on("click", ".employee-card", function (e) {
    if ($(e.target).hasClass("delete-btn")) return; // prevent modal when deleting
    const id = $(this).data("id");
    const emp = manager.employees.find(e => e.id === id);
    if (emp) {
      $("#modalName").text(emp.name);
      $("#modalPosition").text(emp.position);
      $("#modalEmail").text(emp.email);
      modal.fadeIn(300);
    }
  });

  // Close Modal
  closeBtn.on("click", () => modal.fadeOut(300));

  // Add Employee
  $("#addEmployeeBtn").on("click", function () {
    const name = $("#empName").val().trim();
    const position = $("#empPosition").val().trim();
    const email = $("#empEmail").val().trim();

    if (!name || !position || !email) {
      alert("⚠️ Please fill in all fields!");
      return;
    }

    const newEmp = {
      id: manager.employees.length ? manager.employees[manager.employees.length - 1].id + 1 : 1,
      name,
      position,
      email
    };

    try {
      manager.addEmployee(newEmp);
      displayEmployees(manager.employees);
      $("#empName, #empPosition, #empEmail").val("");
      alert("✅ Employee added successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  });

  // Delete Employee
  $(document).on("click", ".delete-btn", function (e) {
    e.stopPropagation();
    const id = $(this).data("id");
    if (confirm("Are you sure you want to remove this employee?")) {
      manager.removeEmployee(id);
      displayEmployees(manager.employees);
    }
  });
});
