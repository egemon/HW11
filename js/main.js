(function(global){

	var testApp = {
		test : function(question, answers, rightAnswers){
			this.question = question;
			this.answers = answers;
			this.rightAnswers = rightAnswers;

		},

		tests : [],

		init: function(){
			testApp.createLoginForm();
			testApp.bindEvents();
		},

		createLoginForm: function(){
			var container = document.createElement('div');
			container.setAttribute('class','container');
			var row = document.createElement('div');
			row.setAttribute('class','row');
			container.appendChild(row);
			var col = document.createElement('div');
			col.setAttribute('class','col-md-12');
			row.appendChild(col);
			var h1 = document.createElement('h1');
			h1.innerHTML = 'Enter you name and pass';
			col.appendChild(h1);
			var loginForm = document.createElement('form');
			loginForm.setAttribute('class','student-auto-form form-horizontal well');
			loginForm.setAttribute('action','#');
			//дальше мне лень это все прописывать руками
			loginForm.innerHTML = '<div class="form-group">					<label for="student-name" class="col-sm-2 control-label">Name</label>						<div class="col-sm-10">							<input type="text" name="student-name" id="student-name" class="form-control">						</div>					</div>					<div class="form-group">						<label for="student-pass" class="col-sm-2 control-label">Password</label>						<div class="col-sm-10">							<input type="password" name="student-pass" id="student-pass" class="form-control">						</div>					</div>					<div class="form-group">						<div class="col-sm-offset-2 col-sm-10">							<input type="submit" value="Залогиниться" class="btn btn-primary">						</div>					</div>';
			col.appendChild(loginForm);
			document.body.appendChild(container);
		},

		bindEvents: function(){
			var form = document.querySelector('.student-auto-form');
			form.addEventListener('submit', this.createTest);
		},

		createTest: function(event){
			event.preventDefault();
			var studentName = document.getElementById('student-name').value;
			var studentPass = document.getElementById('student-pass').value;
			if(studentName == '' || studentPass == ''){ 
				alert('Enter you name and password');
				return;
			};
			testApp.destroyLoginForm(testApp.form);
			testApp.createTestForm();
			var ul = document.createElement('ul');
			ul.setAttribute('class','question-list');
			var testForm = document.querySelector('.testForm');
			testForm.appendChild(ul);

			var tests = [];
			tests[0] = new testApp.test("How are you?", ['good','fine','excellent'], [0,1,0]);
			// tests[1] = new testApp.test("How are you?", ['good','fine'], [0,1]);
			// tests[2] = new testApp.test("How are you?", ['good','fine'], [0,1]);
			// tests[3] = new testApp.test("How are you?", ['good','fine'], [0,1]);
			// tests[4] = new testApp.test("How are you?", ['good','fine'], [0,1]);
			// tests[5] = new testApp.test("How are you?", ['good','fine'], [0,1]);
			// tests[6] = new testApp.test("How are you?", ['good','fine'], [0,1]);
			// tests[7] = new testApp.test("How are you?", ['good','fine'], [0,1]);
			// tests[8] = new testApp.test("How are you?", ['good','fine'], [0,1]);
			// tests[9] = new testApp.test("How are you?", ['good','fine'], [0,1]);
				
			for (var i = 0; i < tests.length; i++) {
				var li = document.createElement('li');
				li.setAttribute('style','list-style:none');
				i++;			
				li.innerHTML += 'вопрос №'+i;
				i--;
				ul.appendChild(li);
				testApp.createQusetion(tests[i],i);
			};
			var submitButton = document.createElement('button');
			submitButton.innerHTML = 'Проверить результаты';
			testForm.appendChild(submitButton);
			testApp.tests = tests;
			testForm.addEventListener('submit',testApp.checkingResults);

			var againButton = document.createElement('button');
			againButton.innerHTML = 'Попробовать еще!';
			var row = document.querySelector('.row');
			againButton.addEventListener('click',testApp.cleanAnswers);
			row.appendChild(againButton);
			
		},

		destroyLoginForm: function(form){
			var form = document.querySelector('.student-auto-form');
			form.parentNode.parentNode.removeChild(form.parentNode);//destroing form			
		},

		createTestForm: function(){
			var TestForm = document.createElement('form');
			TestForm.setAttribute('class','testForm form-horizontal well');
			TestForm.innerHTML = '<legend>Test of programming</legend>';
			var row = document.querySelector('.row');
			row.appendChild(TestForm);
		},

		createQusetion: function(test, number){
			var questionBox = document.createElement('div');
			questionBox.setAttribute('class','questionBox');
			questionBox.innerHTML = test.question;
			for (var i = 0; i < test.answers.length; i++) {
				questionBox.innerHTML += '<label class="checkbox"> <input type="checkbox" value="">'+test.answers[i]+'</label>';
			};
			document.querySelector('.question-list').childNodes[number].appendChild(questionBox);//adding q
		},

		checkingResults : function(event){
			var result=0;
			event.preventDefault();
			var questionList = document.querySelector('.question-list');			
			for (var i = 0; i <= questionList.childNodes.length - 1; i++) {
				var res = 0;
				for (var j = 0; j <= testApp.tests[i].answers.length - 1; j++){

					var currentCheckbox = questionList.childNodes[i].childNodes[1].childNodes[j+1].childNodes[1];
					var currentCheckboxParent = currentCheckbox.parentNode;

					if (currentCheckbox.checked > testApp.tests[i].rightAnswers[j])
						{currentCheckboxParent.setAttribute('style','color:red'); res++; }

			   else if (currentCheckbox.checked < testApp.tests[i].rightAnswers[j])
			   			{currentCheckboxParent.setAttribute('style','color:green');res++;}			 
				};

			if (res>0) {result++};	

			};

			alert('You have '+result+' worng answers');
			result = 0;
		},
		cleanAnswers : function(event){
			event.preventDefault();
			var questionList = document.querySelector('.question-list');			
			for (var i = 0; i <= questionList.childNodes.length - 1; i++) {
				for (var j = 0; j <= testApp.tests[i].answers.length - 1; j++){
					var currentCheckbox = questionList.childNodes[i].childNodes[1].childNodes[j+1].childNodes[1];
					var currentCheckboxParent = currentCheckbox.parentNode;

					currentCheckbox.checked = false;
					currentCheckboxParent.setAttribute('style','color:black');
				}			 
			};
			
		}


	};


	global.createTestModule = testApp;
	global.createTestModule.init();
})(window);












