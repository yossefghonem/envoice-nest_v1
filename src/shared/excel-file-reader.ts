import * as ExcelJS from 'exceljs';

export async function readExcelFile(filePath: string): Promise<any[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1); // Assuming data is in the first worksheet

    const headers: any = worksheet.getRow(1).values;
    const dataRows = worksheet.getRows(2, worksheet.rowCount);

    const records = dataRows.map((row) => {
        const record = {};
        headers.forEach((header, index) => {
            record[header] = row.getCell(index + 1).value;
        });
        return record;
    });

    return records;
}
