
import Papa from 'papaparse'
import * as XLSX from 'xlsx'

//handle csv upload
export const parseCSV = (file: File) => {
    let usersData: any = []

    try {
        Papa.parse(file, {
            complete: (result) => {
                return result;
            },
            header: true,
            skipEmptyLines: true,
        })
    //    console.log(usersData)
    //     return usersData;
    } catch (error: any) {
        toastr.error(error, '', {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        })
    }
}

export const parseExcel = (file: File) => {
    const reader = new FileReader();
    let parsedUsers: any = [];

    try {
        reader.onload = () => {
            const data = new Uint8Array(reader.result as ArrayBuffer)
            const workbook = XLSX.read(data, { type: 'array' })
            const sheet = workbook.Sheets[workbook.SheetNames[0]]
            const usersData = XLSX.utils.sheet_to_json(sheet, { header: 1 })


            parsedUsers = usersData.slice(1).map((row: any) => ({
                name: row[0],
                email: row[1],
                phone: row[2],
                address: row[3],
                admin_id: row[4],
                company_id: row[5],
            }))

        }
        reader.readAsArrayBuffer(file)
        return parsedUsers
    } catch (error: any) {
        toastr.error(error, '', {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        })
    }
}
