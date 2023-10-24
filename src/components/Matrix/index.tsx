
import { ChangeEvent, useState } from 'react';
import mockData, { FunctionGroups, IMockData } from "./data";

var countRender = 0;
function Matrix() {
    let jsonPerm: IMockData;
    if (localStorage.getItem('json-permission')) {
        jsonPerm = JSON.parse(localStorage.getItem('json-permission') || '') as IMockData;
    } else {
        jsonPerm = mockData;
    }
    const [matrix, setMatrix] = useState(jsonPerm);
    const [checkAll, setCheckAll] = useState(false);
    const [isSaveMgs, setIsSaveMgs] = useState(false);
    const [checkAllList, setCheckAllList] = useState(handleCheckAll(jsonPerm));
    const [viewAll, setViewAll] = useState(handleCheckAll(jsonPerm, 'View'));
    const [editAll, setEditAll] = useState(handleCheckAll(jsonPerm, 'Edit'));
    const [createAll, setCreateAll] = useState(handleCheckAll(jsonPerm, 'Create'));
    const [printAll, setPrintAll] = useState(handleCheckAll(jsonPerm, 'Print'));
    const [deleteAll, setDeleteAll] = useState(handleCheckAll(jsonPerm, 'Delete'));

    function handleCheckAll(jsonPerm: any, type: string = 'All') {
        let results: any[] = [];
        let functionGroups = jsonPerm.FunctionGroups as FunctionGroups[];
        let fgs = functionGroups.filter(x => x.Function === null);
        fgs.forEach(fg => {
            results.push({
                "Id": fg.Id,
                "ParentId": fg.ParentId,
                "Title": "Chọn hết",
                "Type": type,
                "IsChecked": false,
            });
        });
        return results;
    }
    function handleCheckbox(event: ChangeEvent<HTMLInputElement>): void {
        const chbxOriginId = event.target.name;
        const chbxStringId = event.target.id;
        const chbxChecked = event.target.checked;
        let chbxType;
        if (chbxStringId && typeof (chbxStringId) === 'string') {
            const arr = chbxStringId.split('_');
            if (arr && arr.length === 2) {
                chbxType = arr[1];
            }
        }

        let functionGroups = matrix.FunctionGroups as FunctionGroups[];
        let currentFg = functionGroups.find(x => x.Id === chbxOriginId);

        if (currentFg && chbxType && currentFg.Function) {
            if (chbxType === 'All') {
                if (chbxChecked) {
                    currentFg.Function.IsAllowAll = true;
                    currentFg.Function.IsAllowView = true;
                    currentFg.Function.IsAllowEdit = true;
                    currentFg.Function.IsAllowCreate = true;
                    currentFg.Function.IsAllowPrint = true;
                    currentFg.Function.IsAllowDelete = true;
                } else {
                    currentFg.Function.IsAllowAll = false;
                    currentFg.Function.IsAllowView = false;
                    currentFg.Function.IsAllowEdit = false;
                    currentFg.Function.IsAllowCreate = false;
                    currentFg.Function.IsAllowPrint = false;
                    currentFg.Function.IsAllowDelete = false;
                }
            }
            else if (chbxType === 'View') currentFg.Function.IsAllowView = !(currentFg.Function.IsAllowView);
            else if (chbxType === 'Edit') currentFg.Function.IsAllowEdit = !(currentFg.Function.IsAllowEdit);
            else if (chbxType === 'Create') currentFg.Function.IsAllowCreate = !(currentFg.Function.IsAllowCreate);
            else if (chbxType === 'Print') currentFg.Function.IsAllowPrint = !(currentFg.Function.IsAllowPrint);
            else if (chbxType === 'Delete') currentFg.Function.IsAllowDelete = !(currentFg.Function.IsAllowDelete);
            setMatrix({ ...matrix });
        }

        //uncheck parent checkbox
        if (!chbxChecked) {
            var chkAll: any = checkAllList.find(x => x.Id === currentFg?.ParentId);
            chkAll.Title = 'Chọn hết';
            chkAll.IsChecked = false;
            setCheckAllList(checkAllList);

            var chkView: any = viewAll.find(x => x.Id === currentFg?.ParentId);
            chkView.Title = 'Chọn hết';
            chkView.IsChecked = false;
            setEditAll(viewAll);

            var chkEdit: any = editAll.find(x => x.Id === currentFg?.ParentId);
            chkEdit.Title = 'Chọn hết';
            chkEdit.IsChecked = false;
            setEditAll(editAll);

            var chkCreate: any = createAll.find(x => x.Id === currentFg?.ParentId);
            chkCreate.Title = 'Chọn hết';
            chkCreate.IsChecked = false;
            setCreateAll(createAll);

            var chkPrint: any = printAll.find(x => x.Id === currentFg?.ParentId);
            chkPrint.Title = 'Chọn hết';
            chkPrint.IsChecked = false;
            setPrintAll(printAll);

            var chkDelete: any = deleteAll.find(x => x.Id === currentFg?.ParentId);
            chkDelete.Title = 'Chọn hết';
            chkDelete.IsChecked = false;
            setDeleteAll(deleteAll);
        }

    }

    function handleSubmit() {
        localStorage.setItem('json-permission', JSON.stringify(matrix));
        setIsSaveMgs(true);
    }
    function handleSelectAll(chbxType: string, fgId: string, event: ChangeEvent<HTMLInputElement>) {
        const isCheckAll = event.target.checked;
        // console.log(chbxType, fgId, isCheckAll);
        if (matrix && matrix.FunctionGroups && matrix.FunctionGroups.length > 0) {
            const { FunctionGroups } = matrix;
            let currentFgs = FunctionGroups.filter(x => x.ParentId === fgId);
            currentFgs.forEach(currentFg => {
                if (currentFg.Function) {
                    if (chbxType === 'All') {
                        var chkAll: any = checkAllList.find(x => x.Id === fgId);
                        var chkView: any = viewAll.find(x => x.Id === fgId);
                        var chkEdit: any = editAll.find(x => x.Id === fgId);
                        var chkCreate: any = createAll.find(x => x.Id === fgId);
                        var chkPrint: any = printAll.find(x => x.Id === fgId);
                        var chkDelete: any = deleteAll.find(x => x.Id === fgId);

                        if (isCheckAll) {
                            currentFg.Function.IsAllowAll = true;
                            currentFg.Function.IsAllowView = true;
                            currentFg.Function.IsAllowEdit = true;
                            currentFg.Function.IsAllowCreate = true;
                            currentFg.Function.IsAllowPrint = true;
                            currentFg.Function.IsAllowDelete = true;
                            //
                            chkAll.Title = 'Bỏ hết';
                            chkAll.IsChecked = true;
                            chkView.Title = 'Bỏ hết';
                            chkView.IsChecked = true;
                            chkEdit.Title = 'Bỏ hết';
                            chkEdit.IsChecked = true;
                            chkCreate.Title = 'Bỏ hết';
                            chkCreate.IsChecked = true;
                            chkPrint.Title = 'Bỏ hết';
                            chkPrint.IsChecked = true;
                            chkDelete.Title = 'Bỏ hết';
                            chkDelete.IsChecked = true;
                        } else {
                            currentFg.Function.IsAllowAll = false;
                            currentFg.Function.IsAllowView = false;
                            currentFg.Function.IsAllowEdit = false;
                            currentFg.Function.IsAllowCreate = false;
                            currentFg.Function.IsAllowPrint = false;
                            currentFg.Function.IsAllowDelete = false;
                            //
                            chkAll.Title = 'Chọn hết';
                            chkAll.IsChecked = false;
                            chkView.Title = 'Chọn hết';
                            chkView.IsChecked = false;
                            chkEdit.Title = 'Chọn hết';
                            chkEdit.IsChecked = false;
                            chkCreate.Title = 'Chọn hết';
                            chkCreate.IsChecked = false;
                            chkPrint.Title = 'Chọn hết';
                            chkPrint.IsChecked = false;
                            chkDelete.Title = 'Chọn hết';
                            chkDelete.IsChecked = false;
                        }
                    }
                    else if (chbxType === 'View') {
                        currentFg.Function.IsAllowView = isCheckAll;
                        var chkView: any = viewAll.find(x => x.Id === fgId);
                        if (isCheckAll) {
                            chkView.Title = 'Bỏ hết';
                            chkView.IsChecked = true;
                        } else {
                            chkView.Title = 'Chọn hết';
                            chkView.IsChecked = false;
                        }
                    }
                    else if (chbxType === 'Edit') {
                        currentFg.Function.IsAllowEdit = isCheckAll;
                        var chkEdit: any = editAll.find(x => x.Id === fgId);
                        if (isCheckAll) {
                            chkEdit.Title = 'Bỏ hết';
                            chkEdit.IsChecked = true;
                        } else {
                            chkEdit.Title = 'Chọn hết';
                            chkEdit.IsChecked = false;
                        }
                    }
                    else if (chbxType === 'Create') {
                        currentFg.Function.IsAllowCreate = isCheckAll;
                        var chkCreate: any = createAll.find(x => x.Id === fgId);

                        if (isCheckAll) {
                            chkCreate.Title = 'Bỏ hết';
                            chkCreate.IsChecked = true;
                        } else {
                            chkCreate.Title = 'Chọn hết';
                            chkCreate.IsChecked = false;
                        }
                    }
                    else if (chbxType === 'Print') {
                        currentFg.Function.IsAllowPrint = isCheckAll;
                        var chkPrint: any = printAll.find(x => x.Id === fgId);

                        if (isCheckAll) {
                            chkPrint.Title = 'Bỏ hết';
                            chkPrint.IsChecked = true;
                        } else {
                            chkPrint.Title = 'Chọn hết';
                            chkPrint.IsChecked = false;
                        }
                    }
                    else if (chbxType === 'Delete') {
                        currentFg.Function.IsAllowDelete = isCheckAll;
                        var chkDelete: any = deleteAll.find(x => x.Id === fgId);
                        if (isCheckAll) {
                            chkDelete.Title = 'Bỏ hết';
                            chkDelete.IsChecked = true;
                        } else {
                            chkDelete.Title = 'Chọn hết';
                            chkDelete.IsChecked = false;
                        }
                    }
                }
            });
            setMatrix({ ...matrix });
            setCheckAll(!checkAll);
            setCheckAllList(checkAllList);
            setViewAll(viewAll);
            setEditAll(editAll);
            setCreateAll(createAll);
            setPrintAll(printAll);
            setDeleteAll(deleteAll);
        }
    }
    function getTitleInCheckAllList(fgId: string, chkList: any[]) {
        for (let i = 0; i < chkList.length; i++) {
            const item = chkList[i];
            if (item.Id === fgId) {
                return item;
            }
        }
        return '';
    }

    if (!matrix || !matrix.User || !matrix.FunctionGroups) return <></>;
    console.log('CountRender', ++countRender);
    return (<div className='matrix'>
        <h1>Grant permission to {matrix.User.Name}</h1>
        <form onSubmit={handleSubmit}>
            <table>
                <thead>
                    <tr>
                        <th>Tên trang quản lý</th>
                        <th>Tất cả</th>
                        <th>Chỉ xem</th>
                        <th>Chỉnh sửa</th>
                        <th>Thêm mới</th>
                        <th>In ấn</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {matrix.FunctionGroups.map((fg) => {
                        if (fg.Function === null) {
                            let objAll = getTitleInCheckAllList(fg.Id, checkAllList);
                            let objView = getTitleInCheckAllList(fg.Id, viewAll);
                            let objEdit = getTitleInCheckAllList(fg.Id, editAll);
                            let objCreate = getTitleInCheckAllList(fg.Id, createAll);
                            let objPrint = getTitleInCheckAllList(fg.Id, printAll);
                            let objDelete = getTitleInCheckAllList(fg.Id, deleteAll);
                            return (
                                <tr className='warehouse-p-bg' key={fg.Id}>
                                    <td className={fg.ParentId !== null ? 'warehouse-p padding-left30' : 'warehouse-p'}>{fg.Name}</td>
                                    <td>
                                        <label className='select-all' >{objAll.Title}
                                            <input className='hide' checked={objAll.IsChecked} type="checkbox" onChange={(event) => handleSelectAll('All', fg.Id, event)} />
                                        </label>
                                    </td>
                                    <td>
                                        <label className='select-all'>{objView.Title}
                                            <input className='hide' type="checkbox" checked={objView.IsChecked} onChange={(event) => handleSelectAll('View', fg.Id, event)} />
                                        </label>
                                    </td>
                                    <td>
                                        <label className='select-all'> {objEdit.Title}
                                            <input className='hide' type="checkbox" checked={objEdit.IsChecked} onChange={(event) => handleSelectAll('Edit', fg.Id, event)} />
                                        </label>
                                    </td>
                                    <td>
                                        <label className='select-all'>{objCreate.Title}
                                            <input className='hide' checked={objCreate.IsChecked} type="checkbox" onChange={(event) => handleSelectAll('Create', fg.Id, event)} />
                                        </label>
                                    </td>
                                    <td>
                                        <label className='select-all'>{objPrint.Title}
                                            <input className='hide' checked={objPrint.IsChecked} type="checkbox" onChange={(event) => handleSelectAll('Print', fg.Id, event)} />
                                        </label>
                                    </td>
                                    <td>
                                        <label className='select-all'>{objDelete.Title}
                                            <input className='hide' checked={objDelete.IsChecked} type="checkbox" onChange={(event) => handleSelectAll('Delete', fg.Id, event)} />
                                        </label>
                                    </td>
                                </tr>
                            );
                        } else {
                            const chbxIdIsAllowAll = fg.Id + "_All";
                            const chbxIdIsAllowView = fg.Id + "_View";
                            const chbxIdIsAllowEdit = fg.Id + "_Edit";
                            const chbxIdIsAllowCreate = fg.Id + "_Create";
                            const chbxIdIsAllowPrint = fg.Id + "_Print";
                            const chbxIdIsAllowDelete = fg.Id + "_Delete";

                            const isAllowView = fg.Function.IsAllowView;
                            const isAllowEdit = fg.Function.IsAllowEdit;
                            const isAllowCreate = fg.Function.IsAllowCreate;
                            const isAllowPrint = fg.Function.IsAllowPrint;
                            const isAllowDelete = fg.Function.IsAllowDelete;
                            const isAllowAll = fg.Function.IsAllowView && fg.Function.IsAllowEdit && fg.Function.IsAllowCreate && fg.Function.IsAllowPrint && fg.Function.IsAllowDelete;

                            return (
                                <tr key={fg.Id}>
                                    <td className='warehouse-c'>{fg.Name}</td>
                                    <td>
                                        <input id={chbxIdIsAllowAll} name={fg.Id} checked={isAllowAll} type="checkbox" onChange={(event) => handleCheckbox(event)} />
                                    </td>
                                    <td>
                                        <input id={chbxIdIsAllowView} name={fg.Id} checked={isAllowView} type="checkbox" onChange={(event) => handleCheckbox(event)} />
                                    </td>
                                    <td>
                                        <input id={chbxIdIsAllowEdit} name={fg.Id} checked={isAllowEdit} type="checkbox" onChange={(event) => handleCheckbox(event)} />
                                    </td>
                                    <td>
                                        <input id={chbxIdIsAllowCreate} name={fg.Id} checked={isAllowCreate} type="checkbox" onChange={(event) => handleCheckbox(event)} />
                                    </td>
                                    <td>
                                        <input id={chbxIdIsAllowPrint} name={fg.Id} checked={isAllowPrint} type="checkbox" onChange={(event) => handleCheckbox(event)} />
                                    </td>
                                    <td>
                                        <input id={chbxIdIsAllowDelete} name={fg.Id} checked={isAllowDelete} type="checkbox" onChange={(event) => handleCheckbox(event)} />
                                    </td>
                                </tr>
                            );
                        }

                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={7}>
                            <button type='button' onClick={handleSubmit}>Save</button>
                            {isSaveMgs && <p className='success'>Lưu thông tin thành công</p>}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </form>
    </div>);
}

export default Matrix;