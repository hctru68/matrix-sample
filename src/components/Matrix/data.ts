export interface IUser {
	Avartar: string;
	Name: string;
	UserId: string;
}

export interface FunctionGroups {
	Id: string;
	Name: string;
	Path: string;
	ParentId: string;
	ParentName: string;
	Function: Function | null;
}
export interface Function {
	IsAllowAll: boolean,
	IsAllowView: boolean,
	IsAllowEdit: boolean,
	IsAllowCreate: boolean,
	IsAllowPrint: boolean,
	IsAllowDelete: boolean
}

export interface ICheckAll {
	"Title": string,
	"IsCheckAll": boolean
}
export interface IMockData {
	"User": IUser,
	"FunctionGroups": FunctionGroups[]
}


const mockData: IMockData = {
	"User": {
		"Avartar": "/tmp/abc.png",
		"Name": "Tran Chi Trung",
		"UserId": "1d4f47eb-8631-45a8-a0c5-a49862cc3ca2"
	},
	"FunctionGroups": [
		// {
		// 	"Id": "1",
		// 	"Name": "QUẢN LÝ KHO GSP",
		// 	"Path": "/a/b/c",
		// 	"ParentId": null,
		// 	"ParentName": null,
		// 	"Function": null
		// },
		{
			"Id": "2",
			"Name": "Kho nguyên phụ liệu",
			"Path": "/a/b/c",
			"ParentId": "1",
			"ParentName": "QUẢN LÝ KHO GSP",
			"Function": null
		},
		{
			"Id": "11",
			"Name": "Lệch chế biến kiêm phiếu xuất kho (đóng gói)",
			"Path": "/a/b/c",
			"ParentId": "2",
			"ParentName": "Kho nguyên phụ liệu",
			"Function": {
				"IsAllowAll": false,
				"IsAllowView": false,
				"IsAllowEdit": true,
				"IsAllowCreate": true,
				"IsAllowPrint": true,
				"IsAllowDelete": true,
			}
		},
		{
			"Id": "12",
			"Name": "Lệch chế biến kiêm phiếu xuất kho (pha chế)",
			"Path": "/a/b/d",
			"ParentId": "2",
			"ParentName": "Kho nguyên phụ liệu",
			"Function": {
				"IsAllowAll": false,
				"IsAllowView": true,
				"IsAllowEdit": false,
				"IsAllowCreate": true,
				"IsAllowPrint": false,
				"IsAllowDelete": false,
			}
		},
		{
			"Id": "10",
			"Name": "Phiếu chuyển kho",
			"Path": "/a/b/d",
			"ParentId": "2",
			"ParentName": "Kho nguyên phụ liệu",
			"Function": {
				"IsAllowAll": false,
				"IsAllowView": true,
				"IsAllowEdit": false,
				"IsAllowCreate": true,
				"IsAllowPrint": false,
				"IsAllowDelete": false,
			}
		},
		{
			"Id": "3",
			"Name": "Kho thành phẩm",
			"Path": "/a/c/c",
			"ParentId": "1",
			"ParentName": "QUẢN LÝ KHO GSP",
			"Function": null
		},
		{
			"Id": "13",
			"Name": "Phiếu nhập kho (thành phẩm)",
			"Path": "/a/c/d",
			"ParentId": "3",
			"ParentName": "Kho thành phẩm",
			"Function": {
				"IsAllowAll": false,
				"IsAllowView": true,
				"IsAllowEdit": true,
				"IsAllowCreate": true,
				"IsAllowPrint": true,
				"IsAllowDelete": true,
			}
		},
		{
			"Id": "14",
			"Name": "Phiếu xuất kho (thành phẩm)",
			"Path": "/a/c/d",
			"ParentId": "3",
			"ParentName": "Kho thành phẩm",
			"Function": {
				"IsAllowAll": false,
				"IsAllowView": true,
				"IsAllowEdit": false,
				"IsAllowCreate": false,
				"IsAllowPrint": false,
				"IsAllowDelete": true,
			}
		},
		{
			"Id": "15",
			"Name": "Phiếu chuyển kho",
			"Path": "/a/c/d",
			"ParentId": "3",
			"ParentName": "Kho thành phẩm",
			"Function": {
				"IsAllowAll": false,
				"IsAllowView": true,
				"IsAllowEdit": false,
				"IsAllowCreate": false,
				"IsAllowPrint": true,
				"IsAllowDelete": false,
			}
		},
		// {
		// 	"Id": "30",
		// 	"Name": "QUẢN LÝ DANH MỤC",
		// 	"Path": "/a/b/c",
		// 	"ParentId": null,
		// 	"ParentName": null,
		// 	"Function": null
		// },
	]
};
export default mockData;