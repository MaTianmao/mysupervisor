'use strict'

function Teacher(props){
	this.name = props.name;
	this.college =  props.college;
	this.department = props.department;
	this.age = props.age;
	this.title = props.title;
	this.comment = props.comment;
	this.author = 0;
}

function createTeacher(props){
	return new Teacher(props);
}

var mysupervisor = function(){
	LocalContractStorage.defineMapProperty(this, "namequery", null);
	LocalContractStorage.defineMapProperty(this, "collegequery", null);
	LocalContractStorage.defineMapProperty(this, "departmentquery", null);
};

mysupervisor.prototype = {
	init: function(){
		
	},

	Add: function(name, college, department, age, title, comment){
		var props = {};
		props.name = name;
		props.college = college;
		props.department = department;
		props.age = age;
		props.title = title;
		props.comment = comment;
		var newteacher = createTeacher(props);
		newteacher.author = Blockchain.transaction.from;
		var nq = this.namequery.get(props.name);
		var cq = this.collegequery.get(props.college);
		var dq = this.departmentquery.get(props.department);
		if(!nq){
			nq = [];
		}
		if(!cq){
			cq = [];
		}
		if(!dq){
			dq = [];
		}
		nq.push(newteacher);
		cq.push(newteacher);
		dq.push(newteacher);
		this.namequery.put(props.name, nq);
		this.collegequery.put(props.college, cq);
		this.departmentquery.put(props.department, dq);
		return "success";
	},

	NameQuery: function(name){
		name = name.trim();
		if(name === ""){
			throw new Error("empty name");
		}
		var nq = this.namequery.get(name);
		return nq;
	},

	CollegeQuery: function(college){
		college = college.trim();
		if(college === ""){
			throw new Error("empty college");
		}
		var cq = this.collegequery.get(college);
		return cq;
	},

	DepartmentQuery: function(department){
		department = department.trim();
		if(department === ""){
			throw new Error("empty department");
		}
		var dq = this.departmentquery.get(department);
		return dq;
	}
};
module.exports = mysupervisor;
//n1s6uWhcVaG7Md27LUjAhHAFWnxzmmPU5pp 
//cbec8c20f39cfccb523da439c2630e6f8cfe73b7319e5d00f11924340aa92bca