function init() {
	$.ajax({
		type: "GET",
		url: "getSavedProjects.php",
		cache: false,
		success: function(data)
		{
			var select = $("#loadProjects");
			var list = [];
			var projects = JSON.parse(data);
			if(projects.length == 0){
				toastr.info("New Project Initialized");
				loadproject();
			}
			else
			{
				for(i=0; i < projects.length; i++)
				{
					list.push('<option data-subtext="' + projects[i].latest + '" value="' + projects[i].id + '">' + projects[i].title + ' Saved At:</option>');
				}
				select.html(list.join(''));
				select.selectpicker('refresh');
				
				openDialog = $("#loadProjectModal").dialog({
					dialogClass: 'noTitleStuff',
					autoOpen: false,
					height: 200,
					width: 400,
					modal: true,
					buttons: {
						"New Project": function() {
							openDialog.dialog("close");
							toastr.info("No saved project selected");
							
							loadproject();
						},
						"Load Project": function(){
							openDialog.dialog("close");
							loadproject();
						}
					},
					"close": function() {
						loadproject();
					}
				});
				$(".ui-dialog-titlebar").hide();
				openDialog.dialog("open");
			}
		}
	});
}

function loadproject(){
	$.ajax({
		type: "GET",
		url: "getProjectDetails.php",
		data: 'id=' + $("#loadProjects").val(),
		cache: false,
		success: function(data)
		{
			window.location.href = "main.php";
		}
	});
}