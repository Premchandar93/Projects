import ViewExperience from './ViewExperience';
import AddInterview from './AddInterview';
import AddFeedback from './AddFeedback';

var data = {
	Title : 'Home',
	Home : {
		Quotes : [
			{
				content : "Don't stop when you are tired. Stop when you are DONE.",
				author : 'Unknown',
			},
			{
				content : "If you don't know, the thing to do is not get scared, but to LEARN.",
				author : "Unknown",
			},
			{
				content : "Confirmity is the jailer of freedom and enemy of growth.",
				author : "John F Kennedy"
			}
		],
		Title : 'Keep Going !!!',
		Content: "In any moment of decision, the best thing you can do is the right thing, the next best thing is the wrong thing, and the worst thing you can do is nothing",
		Heading : 'My Dashboard',
		SubHeading : 'An application to view/keep track of the interviews attended along with its feedback for betterment of myself, based on MERN ( MongoDB Express React Node) stack.',
	},
	Analytics : {
		TotalInterviews : ' Total Interviews Attended',
		LastInterview : 'Days since last interview',

		Pie : 'Interview Rounds',
		PieParagraph : "Displays the interviews attended grouped by its category namely problem_solving, technical_interview, system_design, manager_round, hr_round, online_coding, telephonic_interview...",
		PieForDS : 'Data Structures',
		PieForDSParagraph : "Displays the number of data structures questions grouped by its category namely #array, #hash, #dynamic_programming, #binary_tree, #binary_search_tree, #linked_list, #queue, #stack...",
		Bar : 'Rounds per Company',
		BarParagraph : "Displays the interviews rounds attended in each company. For example, when attended 2 technical interview and 1 problem solving round in a company, it will be shown as single bar stacked",
		Calendar : 'Interviews attended',
		CalendarParagraph : "Displays the number of interviews attended across the year. Hover over the dates to view the same. Note: Many interview rounds attended in a company will be considered as one entry.",
		PieColors : [
			{ "color": "hsl(351, 70%, 50%)" },
			{ "color": "hsl(195, 70%, 50%)" },
			{ "color": "hsl(109, 70%, 50%)" },
			{ "color": "hsl(33, 70%, 50%)" },
			{ "color": "hsl(217, 70%, 50%)" },
			{ "color": "hsl(132, 70%, 50%)" },
			{ "color": "hsl(277, 70%, 50%)" }
		],
	},
	cookies_expiration_time : 86400,
	FormGroup : {
		span : 8,
		offset : 2,
	},
	Developer : {
		oldClientId : '946660173728-2bjr4em1lpc4s5sms65f76r0qg1no3g7.apps.googleusercontent.com',
		oldClientSecret : 'Fnl_XyoMv9fTQdfyZM_yZcAK',
		clientId : '946660173728-n5h68poa2lt0pg59ahm39r6pr2q4oml0.apps.googleusercontent.com',
		clientSecret : 'EY8JP-2NK5QakphwrHvGJynJ',
		cookie_username : 'LOGIN_USERNAME',
		error_title : '401 UNAUTHORIZED !!!',
		error_content : "You are not authorized to view this page",
		admin_users :{
			'Prem Chandar' : 1
		}
	},
	AlertBox : {
		danger_top_margin : '30%',
		danger_right_margin :'45%',
		success_top_margin : '10%',
		success_right_margin: 5,
		position : 'absolute',
		success_color : '#9AFF33',
		warning_color : '#FFD533',
		danger_color : '#FF8033',
		get_success : {
			message : '',
			heading : 'Success',
		},
		get_danger : {
			message : 'Error receiving ',
			heading : 'Error',
		},
		post_success : {
			message : '',
			heading : 'Success',
		},
		post_danger : {
			message : 'Error posting !!',
			heading : 'Error',
		},
		delete_success : {
			message : '',
			heading : 'Success',			
		},
		delete_danger : {
			message : 'Error deleting !',
			heading : 'Error',
		},
		warning : {
			message : '',
			heading : 'Please Wait',
		},
		emptydata : {
			message : 'No Data found !!',
			heading : 'Empty',
			variant : 'warning'
		}
	},
	Headings : [ 
		{ name : 'Add Experience', link : '/addexperience', component: AddInterview},
		{ name : 'Add Feedback', link : '/addfeedback', component: AddFeedback}, 
		{ name : 'View Interviews', link : '/viewexperience', component: ViewExperience} , 
		{ name : 'View tags', link : '/viewtags'},
		{ name : 'Analytics', link : '/analytics'}
	],
	ViewFeedback : {
		Title : 'View Feedback',
		URL : '/interviews/'
	},
	ViewExperience : {
		Title : 'History',
		ModalCount : 3,
		TextForNoData : 'Please attend some interview !!!',
		URL : '/interviews/',
	},
	DeleteInterview : {
		URL : '/interviews/delete/'
	},
	AddInterview : {
		Title : 'Add Experience',
		URL : '/interviews/add',
		Fields : [{
			name : 'Company Name',
			formtype : 'Control',
			type : 'text',
			placeholder : 'Enter Company name',
			formgroupid : 'interview_company_name',
			id : 'newcompanynameid'
		},
		{
			name : 'Company Location',
			formtype : 'Control',
			type : 'text',
			placeholder : 'Enter Company Location',
			formgroupid : 'interview_company_location',
			id : 'newcompanylocation',
		},
		{
			name : 'Role',
			formtype : 'Control',
			type : 'text',
			placeholder : 'Enter the role you applied for',
			formgroupid : 'interview_role',
			id : 'newroleid',
		},
		{
			name : 'Interview date',
			formtype : 'Control',
			type : 'date',
			formgroupid : 'interview_date',
			id : 'newinterviewdateid',
		},
		{
			name : '',
			formtype : 'Check',
			type : 'switch',
			placeholder : 'Selected',
			formgroupid : 'interview_status',
			id : 'newinterviewstatusid',
		},
		{
			name : 'Submit',
			formtype : 'Button',
			type : 'submit',
			variant : 'primary',
			id : 'newinterviewsubmitid'
		}
		]
	},
	AddFeedback : {
		Title : 'Add Feedback',
		URL : '/interviews/addfeedback/',
		company_rounds : ['problem_solving', 'system_design', 'technical_interview', 'manager_round', 'hr_round', 'online_coding', 'telephonic_interview'],
		Fields : [
			{
				name : 'Company Name',
				formtype : 'Select',
				type : 'select',
				formgroupid : 'feedback_company_id',
				values : [],
				id : 'feedbackcompanynameid'
			},
			{
				name : 'Round',
				formtype : 'Select',
				type : 'select',
				formgroupid : 'feedback_company_round',
				id : 'feedbackroundid',
				values : [ {
					name : 'Problem Solving',
					formvalue : 'problem_solving',
					},
					{
						name : 'System Design',
						formvalue : 'system_design',
					},
					{
						name : 'Technical Interview',
						formvalue : 'technical_interview',
					},
					{
						name : 'Manager Round',
						formvalue : 'manager_round',
					},
					{
						name : 'HR Round',
						formvalue : 'hr_round',
					},
					{
						name : 'Online Coding',
						formvalue :'online_coding',
					},
					{
						name : 'Telephonic Interview',
						formvalue : 'telephonic_interview',
				}]
			},
			{
				name : 'Question',
				formtype : 'Control',
				type : 'text',
				placeholder : 'Enter the question ',
				formgroupid : 'feedback_question',
				id : 'feedbackquestionid',
			},
			{
				name : 'Problem description',
				formtype : 'ControlAs',
				type : 'textarea',
				row : 3,
				placeholder : 'Explain the problem/question in detail',
				formgroupid : 'feedback_description',
				id : 'feedbackdescriptionid',
			},
			{
				name : 'Solution',
				formtype : 'ControlAs',
				rows : 3,
				type : 'textarea',
				placeholder : 'Enter the solution',
				formgroupid : 'feedback_answer',
				id : 'feedbackanswerid',
			},
			{
				name : 'Feedback',
				formtype : 'Control',
				type : 'text',
				placeholder : 'Enter your answer/feedback',
				formgroupid : 'feedback_feedback',
				id : 'feedbackanswerid',
			},
			{
				name : 'Tag',
				formtype : 'Control',
				type : 'text',
				placeholder : 'Enter the tags for the question',
				formgroupid : 'feedback_tag',
				id : 'feedbacktagid',
			},
			{
				name : 'Submit',
				formtype : 'Button',
				type : 'submit',
				variant : 'primary',
				id : 'feedbackinterviewsubmitid'
			}
		]
	}
};

export default data;