/* OUTPUT CASPERJS SCRIPT FOR TAGUI FRAMEWORK ~ TEBEL.ORG */

var casper = require('casper').create();
// TagUI web automation browser settings
// verbose style to support tester module

// set default flow language
var tagui_language = 'english';

// set time in ms before error out
casper.options.waitTimeout = 10000;
casper.options.logLevel = 'debug';

// set web browser display size
casper.options.viewportSize = {
width: 1366,
height: 768
};

// settings for PhantomJS mode
casper.options.pageSettings = {
loadImages: true,
loadPlugins: true,
webSecurityEnabled: true,
ignoreSslErrors: false,
localToRemoteUrlAccessEnabled: false
};

// Q1. Why is formatting for this file so messed up? - it's created on the road
// If you want to know more - https://github.com/kelaberetiv/TagUI/issues/490

// Q2. Is there a beautified version for easier viewing or editing?
// Use this to view pretty version - https://prettier.io/playground

// xpath for object identification
var xps666 = require('casper').selectXPath;

// assign parameters to p1-p8 variables
var p1 = casper.cli.raw.get(0); var p2 = casper.cli.raw.get(1); var p3 = casper.cli.raw.get(2);
var p4 = casper.cli.raw.get(3); var p5 = casper.cli.raw.get(4); var p6 = casper.cli.raw.get(5);
var p7 = casper.cli.raw.get(6); var p8 = casper.cli.raw.get(7); // p9 (${10}) is less portable

// default p1-p8 to blank instead of undefined
if (!p1) p1 = ''; if (!p2) p2 = ''; if (!p3) p3 = ''; if (!p4) p4 = '';
if (!p5) p5 = ''; if (!p6) p6 = ''; if (!p7) p7 = ''; if (!p8) p8 = '';

// save start time to measure execution time
var automation_start_time = Date.now(); casper.echo('\nSTART - automation started - ' + Date().toLocaleString());

// initialise time for timer() function
var timer_start_time = Date.now();

// infinity constant for use in for loops
var infinity = 1024;

// initialise default global variables
var quiet_mode = false; var save_text_count = 0; var snap_image_count = 0;

// counters for tracking messages in r, python, sikuli, chrome integrations
var r_count = 0; var py_count = 0; var sikuli_count = 0; var chrome_id = 1;

// chrome context for frame handling and targetid for popup handling
var chrome_context = 'document'; var chrome_targetid = '';

// to track download path if set by user using 'download to location' step
var download_path = '';

// variables to track frame offset if current context is within a frame
var frame_step_offset_x = 0; var frame_step_offset_y = 0;
var original_frame_step_offset_x = 0; var original_frame_step_offset_y = 0;

// variable for ask step to accept user input
var ask_result = '';

// JSON variable to pass variables into browser DOM
var dom_json = {}; var dom_result = '';

// variable for user OS with values windows, mac, linux
var user_system = require('system').os.name;

// telegram step api endpoint, you can host on your own server or cloud
// see https://github.com/kelaberetiv/TagUI/tree/master/src/telegram
var telegram_endpoint = 'https://tebel.org/taguibot';

// variable for advance usage of api step
var api_config = {method:'GET', header:[], body:{}};

// variables for api and run steps execution result
var api_result = ''; var api_json = {}; var run_result = ''; var run_json = {};

// variables for R and Python integration execution result
var r_result = ''; var r_json = {}; var py_result = ''; var py_json = {};

// variables for Excel integration execution result
var excel_result = ''; var excel_json = {}; var excel_files = [];
var excel_focus = false; var excel_visible = true;
var excel_password = '';

// variables for Word integraton execution result
var word_result = ''; var word_json = {};

// variables for PDF integraton execution result
var pdf_result = ''; var pdf_json = {};

// track begin-finish blocks for integrations eg - py, r, run, vision, js, dom
var inside_py_block = 0; var inside_r_block = 0; var inside_run_block = 0;
var inside_vision_block = 0; var inside_js_block = 0; var inside_dom_block = 0;

// determine how many casper.then steps to skip
function teleport_distance(teleport_marker) {number_to_hop = 0;
if (teleport_marker.indexOf('[BREAK_SIGNAL]') > -1) {for (s = casper.steps.length-1; s >= 0; s--) {
if (casper.steps[s].toString() == ("function () {for_loop_signal = '"+teleport_marker+"';}"))
{number_to_hop = s; break;}};} // search backward direction for break step
else if (teleport_marker.indexOf('[CONTINUE_SIGNAL]') > -1) {for (s = casper.step; s <= casper.steps.length-1; s++) {
if (casper.steps[s].toString() == ("function () {for_loop_signal = '"+teleport_marker+"';}"))
{number_to_hop = s; break;}}; // search forward direction for continue step
if (number_to_hop == 0) {for (s = casper.steps.length-1; s >= 0; s--) {if (casper.steps[s].toString() == 
("function () {for_loop_signal = '"+teleport_marker.replace('[CONTINUE_SIGNAL]','[BREAK_SIGNAL]')+"';}"))
{number_to_hop = s; break;}};}} // handle as break if no step left to continue
else return 0; if ((number_to_hop - casper.step) > 0) return (number_to_hop - casper.step); else return 0;}

// techo function for handling quiet option
function techo(echo_string) {if (!quiet_mode) { // mute about:blank, eg for desktop automation
if ((echo_string == 'about:blank - \n') || (echo_string == '\nabout:blank - ')) casper.echo('');
else if (tagui_language.toLowerCase() == 'english') casper.echo(echo_string);
else {var translated_string = translate(echo_string,'to',tagui_language.toLowerCase()); casper.echo(translated_string);
if (translated_string.indexOf('ERROR - translation engine') !== -1) casper.exit();}} return;}

// for muting echo in test automation scripts
function dummy_echo(muted_string) {return;}

// for saving text information to file
function save_text(file_name,info_text) {var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\';
if (!file_name) {save_text_count++; file_name = flow_path + ds + 'text' + save_text_count.toString() + '.txt';}
var fs = require('fs'); fs.write(file_name, info_text + '\r\n', 'w');}

// for appending text information to file
function append_text(file_name,info_text) {var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\';
if (!file_name) {if (save_text_count==0) save_text_count++; // increment if 0, else use same count to append
file_name = flow_path + ds + 'text' + save_text_count.toString() + '.txt';}
var fs = require('fs'); fs.write(file_name, info_text + '\r\n', 'a');}

// for saving snapshots of website to file
function snap_image() {var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\';
snap_image_count++; return (flow_path + ds + 'snap' + snap_image_count.toString() + '.png');}

// for saving table from website to file
function save_table(file_name,selector) {var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\';
if (!file_name) {save_text_count++; file_name = flow_path + ds + 'table' + save_text_count.toString() + '.csv';}
var row_data = ""; var table_cell = ""; var fs = require('fs'); fs.write(file_name, '', 'w'); // always reset file
if (!chrome.exists(selector) || (selector.toString().indexOf('xpath selector: ')==-1)) return false; // exit if invalid
if (selector.toString().length == 16) selector = ''; else selector = selector.toString().substring(16); // get xpath
for (table_row=1; table_row<=1024; table_row++) {row_data = ""; for (table_col=1; table_col<=1024; table_col++) {
table_cell = '(((' + selector + '//tr)[' + table_row + ']//th)' + '|'; // build cell xpath selector to include
table_cell += '((' + selector + '//tr)[' + table_row + ']//td))[' + table_col + ']'; // both th and td elements
if (chrome.exists(xps666(table_cell))) row_data = row_data + '","' + chrome.fetchText(xps666(table_cell)).trim();
else break;} // if searching for table cells (th and td) is not successful, means end of row is reached
if (row_data.substr(0,2) == '",') {row_data = row_data.substr(2); row_data += '"'; append_text(file_name,row_data);}
else return true;}} // if '",' is not found, means end of table is reached as there is no cell found in row

function windows_path(input_path) { // for converting file path to windows standard for excel integration
if (!input_path || input_path == '') return ''; // replace / and \\ characters to be \ character
input_path = input_path.replace(/\//g,'\\'); return input_path.replace(/\\\\/,'\\');}

function excel_range_to_size(input_range) { // for converting excel range to array size
if (!input_range || input_range == '') return [0,0]; else if (input_range.indexOf(':') == -1) return [1,1];
var range_start = input_range.split(':')[0].trim(); var range_end = input_range.split(':')[1].trim();
var row_start = range_start.match(/\d+/g); var row_end = range_end.match(/\d+/g);
var col_start = range_start.match(/[a-zA-Z]+/g); var col_end = range_end.match(/[a-zA-Z]+/g); 
// use special number 1234567 to mark column and row selection, since excel max rows is 1048576 and max cols is 16384
if (row_start == null && row_end == null) return [1,1234567];
else if (col_start == null && col_end == null) return [1234567,1];
var height = parseInt(row_end) - parseInt(row_start) + 1;
col_start = col_start.toString().toUpperCase(); var col_start_count = 0; var col_start_len = col_start.length;
for (cs_pos = 0; cs_pos < col_start_len; cs_pos++) {
col_start_count += (col_start.charCodeAt(cs_pos) - 64) * Math.pow(26, col_start_len - cs_pos - 1);}
col_end = col_end.toString().toUpperCase(); var col_end_count = 0; var col_end_len = col_end.length;
for (ce_pos = 0; ce_pos < col_end_len; ce_pos++) {
col_end_count += (col_end.charCodeAt(ce_pos) - 64) * Math.pow(26, col_end_len - ce_pos - 1);}
var width = col_end_count - col_start_count + 1; return [width,height];}

function read_excel(input_excel) { // for reading from excel target
if (user_system == 'windows') {
var workbook_file = input_excel.split(']')[0].slice(1).trim(); input_excel = input_excel.split(']')[1];
var sheet_name = input_excel.split('!')[0].trim(); var cell_range = input_excel.split('!')[1].trim();
workbook_file = abs_file(workbook_file); if (excel_files.indexOf(workbook_file) == -1) excel_files.push(workbook_file);
var fs = require('fs'); if (!fs.exists(workbook_file))
casper.echo('ERROR - cannot find Excel file ' + workbook_file).exit();
var excel_password_code = ''; if (excel_password != '')
excel_password_code = ',,,,"' + excel_password.replace(/\"/g, '\\"') + '"';
var excel_visible_code = 'objExcel.Visible = True'; if (!excel_visible) excel_visible_code = 'objExcel.Visible = False';
var excel_focus_code = ''; if (excel_focus) excel_focus_code = '' +
'CreateObject("WScript.Shell").AppActivate Left(objWorkbook.Name, InStr(objWorkbook.Name, ".") - 1) & " - Excel"\r\n\r\n';
var excel_steps = 'Dim excelFilename, excelSheet\r\nexcelFilename = "' + windows_path(workbook_file) +
'"\r\n\r\n' + 'On Error Resume Next\r\nSet objExcel = GetObject(, "Excel.Application")\r\n' +
'If Err.Number <> 0 Then\r\n\tSet objExcel = CreateObject("Excel.Application")\r\n' +
'End If\r\nOn Error Goto 0\r\n\r\n' + 'Set objWorkbook = objExcel.Workbooks.Open(excelFilename' +
excel_password_code + ')\r\n' + excel_visible_code + '\r\n\r\n' + excel_focus_code +
'excelSheet = "' + sheet_name + '"\r\nOn Error Resume Next\r\nSet targetSheet = Nothing\r\n' +
'Set targetSheet = objWorkbook.Sheets(excelSheet)\r\nOn Error GoTo 0\r\nIf targetSheet Is Nothing Then\r\n\t' +
'WScript.Echo "ERROR - cannot find Excel sheet " & excelSheet\r\nElse\r\n\tobjWorkbook.Sheets(excelSheet).Activate\r\n\t' +
'Dim arrayData, arrayString, rowCount, colCount\r\n\t' + 
'rowCount = objWorkbook.Sheets(excelSheet).Range("' +
cell_range + ' " & objWorkbook.Sheets(excelSheet).UsedRange.Address).Rows.Count\r\n\t' +
'colCount = objWorkbook.Sheets(excelSheet).Range("' +
cell_range + ' " & objWorkbook.Sheets(excelSheet).UsedRange.Address).Columns.Count\r\n\t' +
'arrayData = objWorkbook.Sheets(excelSheet).Range("' +
cell_range + ' " & objWorkbook.Sheets(excelSheet).UsedRange.Address).Value\r\n\t' +
'arrayString = ""\r\n\tIf IsArray(arrayData) Then\r\n\t\t' +
'Dim arrayRow, arrayCol\r\n\t\tFor arrayRow = 1 To UBound(arrayData, 1)\r\n\t\t\t' +
'For arrayCol = 1 to UBound(arrayData, 2)\r\n\t\t\t\tarrayString = arrayString & arrayData(arrayRow, arrayCol) & "[EXCEL_DELIMITER]"' +
'\r\n\t\t\tNext\r\n\t\tNext\r\n\t\tarrayString = arrayString & rowCount & "[EXCEL_DELIMITER]" & colCount' +
'\r\n\tElse\r\n\t\tarrayString = arrayData & "[EXCEL_DELIMITER]1[EXCEL_DELIMITER]1"\r\n\tEnd If\r\n\t' +
'WScript.Echo arrayString\r\nEnd If\r\n'; save_text('excel_steps.vbs', excel_steps);
casper.waitForExec('cscript excel_steps.vbs //NoLogo', null, function(response) {excel_result = '';
excel_result = (response.data.stdout.trim() || response.data.stderr.trim());
if (excel_result.indexOf('ERROR - cannot find Excel sheet') !== -1) casper.echo(excel_result).exit();
var range_size = excel_range_to_size(cell_range); if (range_size[0] > 1 || range_size[1] > 1)
{excel_result += ' '; excel_result = excel_result.split('[EXCEL_DELIMITER]'); var excel_array = [];
excel_result[excel_result.length - 1] = excel_result[excel_result.length - 1].slice(0, -1);
// special handling with number 1234567 for column and row selection
if (range_size[0] == 1234567) {range_size[0] = excel_result.pop(); range_size[1] = excel_result.pop();}
else if (range_size[1] == 1234567) {range_size[0] = excel_result.pop(); range_size[1] = excel_result.pop();}
else {excel_result.pop(); excel_result.pop();} // remove row and column count data from excel_result
for (row = 0; row < range_size[1]; row++) {excel_array.push(excel_result.splice(0, range_size[0]));}
for (row = 0; row < range_size[1]; row++) for (col = 0; col < range_size[0]; col++) {
if (excel_array[row][col] && !isNaN(excel_array[row][col])) excel_array[row][col] = Number(excel_array[row][col]);}
excel_result = excel_array;} else {excel_result = excel_result.split('[EXCEL_DELIMITER]')[0];
if (excel_result && !isNaN(excel_result)) excel_result = Number(excel_result);}
excel_json = response.data;}, function() {this.echo('ERROR - Excel automation exceeded '+(3 * casper.options.waitTimeout/1000).toFixed(1)+'s timeout').exit();},(3 * casper.options.waitTimeout));}
else if (user_system == 'mac') {
var workbook_file = input_excel.split(']')[0].slice(1).trim(); input_excel = input_excel.split(']')[1]; 
var sheet_name = input_excel.split('!')[0].trim(); var cell_range = input_excel.split('!')[1].trim();
workbook_file = abs_file(workbook_file); if (excel_files.indexOf(workbook_file) == -1) excel_files.push(workbook_file);
var fs = require('fs'); if (!fs.exists(workbook_file))
casper.echo('ERROR - cannot find Excel file ' + workbook_file).exit();
var excel_password_code = ''; if (excel_password != '')
excel_password_code = ' password "' + excel_password.replace(/\"/g, '\\"') + '"';
var column_range = cell_range; if (column_range.indexOf(':') == -1) column_range = cell_range + ':' + cell_range;
var excel_visible_code = 'tell application "System Events"\r\n\t\t' +
'set excel_process to first process whose name is "Microsoft Excel"\r\n\t\t' +
'set visible of excel_process to ' + excel_visible.toString() + '\r\n\tend tell\r\n\t';
var excel_focus_code = ''; if (excel_focus) excel_focus_code = 'activate\r\n\t';
var excel_steps = 'tell application "Microsoft Excel"\r\n\t' + excel_focus_code +
'open workbook workbook file name POSIX file "' + workbook_file +
'"' + excel_password_code + '\r\n\t' + excel_visible_code + 
'if not exists sheet "' + sheet_name + '" then\r\n\t\t' +
'do shell script "echo ERROR - cannot find Excel sheet ' + sheet_name + '"\r\n\telse\r\n\t\t' +
'select worksheet "' + sheet_name + '"\r\n\t\t' +
'tell range "' + column_range + '" of active sheet\r\n\t\t\t' +
'repeat with i from 1 to (count columns)\r\n\t\t\t\t' +
'autofit column i\r\n\t\t\t' +
'end repeat\r\n\t\t' +
'end tell\r\n\t\t' +
'set row_count to count of rows of range ("' + cell_range + ' " & get address of used range of active sheet)\r\n\t\t' +
'set col_count to count of columns of range ("' + cell_range + ' " & get address of used range of active sheet)\r\n\t\t' +
'set list_data to {} & string value of range ("' + cell_range + ' " & get address of used range of active sheet) ' +
'& row_count & col_count\r\n\tend if\r\nend tell\r\n' + 'set text item delimiters to "[EXCEL_DELIMITER]"\r\n' + 
'get list_data as text'; save_text('excel_steps.scpt', excel_steps);
casper.waitForExec('osascript excel_steps.scpt', null, function(response) {excel_result = '';
excel_result = (response.data.stdout.trim() || response.data.stderr.trim());
if (excel_result.indexOf('ERROR - cannot find Excel sheet') !== -1) casper.echo(excel_result).exit();
var range_size = excel_range_to_size(cell_range); if (range_size[0] > 1 || range_size[1] > 1)
{excel_result += ' '; excel_result = excel_result.split('[EXCEL_DELIMITER]'); var excel_array = [];
excel_result[excel_result.length - 1] = excel_result[excel_result.length - 1].slice(0, -1);
// special handling with number 1234567 for column and row selection
if (range_size[0] == 1234567) {range_size[0] = excel_result.pop(); range_size[1] = excel_result.pop();}
else if (range_size[1] == 1234567) {range_size[0] = excel_result.pop(); range_size[1] = excel_result.pop();}
else {excel_result.pop(); excel_result.pop();} // remove row and column count data from excel_result
for (row = 0; row < range_size[1]; row++) {excel_array.push(excel_result.splice(0, range_size[0]));}
for (row = 0; row < range_size[1]; row++) for (col = 0; col < range_size[0]; col++) {
if (excel_array[row][col] && !isNaN(excel_array[row][col])) excel_array[row][col] = Number(excel_array[row][col]);}
excel_result = excel_array;} else {excel_result = excel_result.split('[EXCEL_DELIMITER]')[0];
if (excel_result && !isNaN(excel_result)) excel_result = Number(excel_result);}
excel_json = response.data;}, function() {this.echo('ERROR - Excel automation exceeded '+(3 * casper.options.waitTimeout/1000).toFixed(1)+'s timeout').exit();},(3 * casper.options.waitTimeout));}
else casper.echo('ERROR - unsupported operating system ' + user_system).exit();}

function size_to_excel_range(cell, width, height) { // for converting array to range
var row_start = parseInt(cell.match(/\d+/g)); var row_end = row_start + height - 1;
var col_start = cell.match(/[a-zA-Z]+/g)[0].toUpperCase(); var col_end = col_start;
var first_char = ''; var mid_char = ''; var last_char = '';
if (col_end.length == 1) {first_char = '-'; mid_char = '-'; last_char = col_end;}
else if (col_end.length == 2) {first_char = '-'; mid_char = col_end[0]; last_char = col_end[1];}
else {first_char = col_end[0]; mid_char = col_end[1]; last_char = col_end[2];}
for (count = 0; count < width - 1; count++) {
last_char = String.fromCharCode(last_char.charCodeAt() + 1); if (last_char != '[') continue; else last_char = 'A';
if (mid_char == '-') {mid_char = 'A'; continue;}
else {mid_char = String.fromCharCode(mid_char.charCodeAt() + 1); if (mid_char != '[') continue; else mid_char = 'A';
if (first_char == '-') {first_char = 'A'; continue;}
else first_char = String.fromCharCode(first_char.charCodeAt() + 1);}}
col_end = first_char + mid_char + last_char; col_end = col_end.replace(/-/g,'');
return cell + ':' + col_end + row_end.toString();}

function write_excel(output_excel) { // for writing to excel target
if (user_system == 'windows') {
var workbook_file = output_excel.split(']')[0].slice(1).trim(); output_excel = output_excel.split(']')[1];
var sheet_name = output_excel.split('!')[0].trim(); var cell_range = output_excel.split('!')[1].trim();
cell_range = cell_range.split(':')[0]; // truncate to get starting cell to write various data types
if (!Array.isArray(excel_result)) {
excel_result = 'objWorkbook.Sheets(excelSheet).Range("' + cell_range + '").Value = "' + excel_result  + '"\r\n';}
else {var range_size = [excel_result[0].length, excel_result.length];
cell_range = size_to_excel_range(cell_range, range_size[0], range_size[1]);
var array_result = 'Dim arrayData(' + (range_size[1] - 1).toString() + ', ' + (range_size[0] - 1).toString() + ')\r\n';
for (row = 0; row < range_size[1]; row++) {for (col = 0; col < range_size[0]; col++) {array_result = array_result +
'arrayData(' + row.toString() + ', ' + col.toString() + ') = "' + excel_result[row][col].toString() + '"\r\n';}}
array_result += 'objWorkbook.Sheets(excelSheet).Range("' + cell_range + '").Value = arrayData\r\n';
excel_result = array_result;}
workbook_file = abs_file(workbook_file); if (excel_files.indexOf(workbook_file) == -1) excel_files.push(workbook_file);
var excel_password_code = ''; if (excel_password != '')
excel_password_code = ',,,,"' + excel_password.replace(/\"/g, '\\"') + '"';
var excel_visible_code = 'objExcel.Visible = True'; if (!excel_visible) excel_visible_code = 'objExcel.Visible = False';
var excel_focus_code = ''; if (excel_focus) excel_focus_code = '' +
'CreateObject("WScript.Shell").AppActivate Left(objWorkbook.Name, InStr(objWorkbook.Name, ".") - 1) & " - Excel"\r\n\r\n';
var excel_steps = ''; var excel_new_file = ''; var fs = require('fs'); if (!fs.exists(workbook_file))
excel_new_file = 'Set objWorkbook = objExcel.Workbooks.Add\r\nobjWorkbook.SaveAs excelFilename\r\n';
excel_steps = 'Dim excelFilename, excelSheet\r\nexcelFilename = "' + windows_path(workbook_file) +
'"\r\n\r\n' + 'On Error Resume Next\r\nSet objExcel = GetObject(, "Excel.Application")\r\n' +
'If Err.Number <> 0 Then\r\n\tSet objExcel = CreateObject("Excel.Application")\r\n' +
'End If\r\nOn Error Goto 0\r\n\r\n' + excel_new_file +
'Set objWorkbook = objExcel.Workbooks.Open(excelFilename' +
excel_password_code + ')\r\n' + excel_visible_code + '\r\n\r\n' + excel_focus_code +
'excelSheet = "' + sheet_name + '"\r\nOn Error Resume Next\r\nSet targetSheet = Nothing\r\n' +
'Set targetSheet = objWorkbook.Sheets(excelSheet)\r\nOn Error GoTo 0\r\nIf targetSheet Is Nothing Then\r\n\t' +
'objWorkbook.Sheets.Add.Name = excelSheet\r\nEnd If\r\nobjWorkbook.Sheets(excelSheet).Activate\r\n\r\n' + excel_result;
save_text('excel_steps.vbs', excel_steps);
casper.waitForExec('cscript excel_steps.vbs //NoLogo', null, function(response) {excel_result = '';
excel_result = (response.data.stdout.trim() || response.data.stderr.trim());
excel_json = response.data;}, function() {this.echo('ERROR - Excel automation exceeded '+(3 * casper.options.waitTimeout/1000).toFixed(1)+'s timeout').exit();},(3 * casper.options.waitTimeout));}
else if (user_system == 'mac') {
var workbook_file = output_excel.split(']')[0].slice(1).trim(); output_excel = output_excel.split(']')[1];
var sheet_name = output_excel.split('!')[0].trim(); var cell_range = output_excel.split('!')[1].trim();
cell_range = cell_range.split(':')[0]; // truncate to get starting cell to write various data types
excel_result = JSON.stringify(excel_result).replace(/\[/g,'{').replace(/\]/g,'}')
if (excel_result.charAt(0) == '{' && excel_result.charAt(excel_result.length - 1) == '}')
{var data = JSON.parse(excel_result.replace(/{/g,'[').replace(/}/g,']'));
cell_range = size_to_excel_range(cell_range, data[0].length, data.length);}
workbook_file = abs_file(workbook_file); if (excel_files.indexOf(workbook_file) == -1) excel_files.push(workbook_file); 
var excel_password_code = ''; if (excel_password != '')
excel_password_code = ' password "' + excel_password.replace(/\"/g, '\\"') + '"';
var excel_visible_code = 'tell application "System Events"\r\n\t\t' +
'set excel_process to first process whose name is "Microsoft Excel"\r\n\t\t' +
'set visible of excel_process to ' + excel_visible.toString() + '\r\n\tend tell\r\n\t';
var excel_focus_code = ''; if (excel_focus) excel_focus_code = 'activate\r\n\t';
var excel_steps = ''; var fs = require('fs'); if (!fs.exists(workbook_file))
excel_steps = 'tell application "Microsoft Excel"\r\n\t' + excel_focus_code + 'set myWorkbook to make new workbook\r\n\t' +
'save workbook as myWorkbook filename POSIX file "' + workbook_file + '"\r\n\t' + 'end tell\r\n\r\n';
excel_steps += 'tell application "Microsoft Excel"\r\n\t' + excel_focus_code +
'open workbook workbook file name POSIX file "' + workbook_file +
'"' + excel_password_code + '\r\n\t' + excel_visible_code +
'if not exists sheet "' + sheet_name + '" then\r\n\t\t' +
'make new worksheet at end of active workbook with properties {name:"' + sheet_name + '"}\r\n\tend if\r\n\t' +
'select worksheet "' + sheet_name + '"\r\n\t' + 'set value of range "' + cell_range + '" to ' + excel_result + '\r\n' +
'end tell'; save_text('excel_steps.scpt', excel_steps);
casper.waitForExec('osascript excel_steps.scpt', null, function(response) {excel_result = '';
excel_result = (response.data.stdout.trim() || response.data.stderr.trim());
excel_json = response.data;}, function() {this.echo('ERROR - Excel automation exceeded '+(3 * casper.options.waitTimeout/1000).toFixed(1)+'s timeout').exit();},(3 * casper.options.waitTimeout));}
else casper.echo('ERROR - unsupported operating system ' + user_system).exit();}

// for excel statements - retrieving data for variable on right side of = sign
// broken into 2 functions for excel_result to be usable with CasperJS structure
function excel_retrieve(right_param) { // check OS before starting Excel automation
if (user_system != 'windows' && user_system != 'mac') {excel_result = '';
casper.echo('ERROR - Excel automation only for Windows and Mac').exit();}
if (right_param.match(/\[.*\.(xl.|xl..|xml|csv)\].*![A-Z0-9]*/i) == null)
{excel_result = ''; excel_result = eval(right_param);}
else if (excel_result == '[LIVE_MODE]') {excel_result = '';
casper.echo('ERROR - reading from Excel not supported in live mode');}
else {excel_result = ''; read_excel(right_param);}}

// for excel statements - assigning data to variable on left side of = sign
// broken into 2 functions for excel_result to be usable with CasperJS structure
function excel_assign(left_param) {if (left_param.match(/\[.*\.(xl.|xl..|xml|csv)\].*![A-Z0-9]*/i) == null)
eval(left_param + ' = excel_result'); else write_excel(left_param);}

function excel_close() { // for closing excel files opened by TagUI
if (user_system == 'windows') {
var excel_focus_code = ''; if (excel_focus) excel_focus_code = '' +
'CreateObject("WScript.Shell").AppActivate Left(objWorkbook.Name, InStr(objWorkbook.Name, ".") - 1) & " - Excel"\r\n\t\t\t';
var excel_steps = 'Dim excelFilename\r\n'; excel_files.forEach(function(workbook_file) {
excel_steps += 'excelFilename = "' + windows_path(workbook_file) + '"\r\n' + 'On Error Resume Next\r\n' +
'Set objExcel = GetObject(, "Excel.Application")\r\nIf Err.Number = 0 Then\r\n\t' +
'For Each objWorkbook In objExcel.Workbooks\r\n\t\t' +
'If excelFilename = objWorkbook.Path & "\\" & objWorkbook.Name Then\r\n\t\t\t' +
'Set objWorkbook = GetObject(excelFilename)\r\n\t\t\t' + excel_focus_code + 'objWorkbook.Close True\r\n\t\t\t' + 
'Exit For\r\n\t\tEnd If\r\n\tNext\r\nEnd If\r\nOn Error Goto 0\r\n';});
save_text('excel_steps.vbs', excel_steps);
casper.waitForExec('cscript excel_steps.vbs //NoLogo', null, function(response) {excel_result = '';
excel_result = (response.data.stdout.trim() || response.data.stderr.trim());
excel_json = response.data;}, function() {this.echo('ERROR - Excel automation exceeded '+(3 * casper.options.waitTimeout/1000).toFixed(1)+'s timeout').exit();},(3 * casper.options.waitTimeout));}
else if (user_system == 'mac') {
var excel_focus_code = ''; if (excel_focus) excel_focus_code = 'activate\r\n\t';
var excel_steps = ''; excel_files.forEach(function(workbook_file) {
excel_steps += 'tell application "Microsoft Excel"\r\n\t' + excel_focus_code +
'open workbook workbook file name POSIX file "' + workbook_file + '"\r\n\t' +
'close active workbook with saving' + '\r\n' + 'end tell\r\n\r\n';});
save_text('excel_steps.scpt', excel_steps);
casper.waitForExec('osascript excel_steps.scpt', null, function(response) {excel_result = '';
excel_result = (response.data.stdout.trim() || response.data.stderr.trim());
excel_json = response.data;}, function() {this.echo('ERROR - Excel automation exceeded '+(3 * casper.options.waitTimeout/1000).toFixed(1)+'s timeout').exit();},(3 * casper.options.waitTimeout));}
else casper.echo('ERROR - unsupported operating system ' + user_system).exit();}

function read_word(input_word) { // for reading from word target
if (user_system == 'windows') {
var word_file = input_word.split(']')[0].slice(1).trim();
word_file = abs_file(word_file); var fs = require('fs'); if (!fs.exists(word_file))
casper.echo('ERROR - cannot find Word file ' + word_file).exit();
var word_steps = 'Set WshShell = WScript.CreateObject("WScript.Shell")\r\n';
word_steps += 'WshShell.Run """' + windows_path(word_file) + '"""\r\nWScript.Sleep 5000\r\n';
word_steps += 'WshShell.SendKeys "^a"\r\nWScript.Sleep 1000\r\n';
word_steps += 'WshShell.SendKeys "^c"\r\nWScript.Sleep 1000\r\n';
word_steps += 'WshShell.SendKeys "%{F4}"\r\nSet objHTML = CreateObject("htmlfile")\r\n';
word_steps += 'WScript.Echo objHTML.ParentWindow.ClipboardData.GetData("text")'; save_text('word_steps.vbs', word_steps);
save_text('word_steps.cmd', '@echo off\r\ncscript word_steps.vbs //NoLogo > word_steps.out 2>&1');
casper.waitForExec('word_steps.cmd', null, function(response) {
word_result = ''; word_result = require('fs').read('word_steps.out').trim();
}, function() {this.echo('ERROR - Word automation exceeded '+(3 * casper.options.waitTimeout/1000).toFixed(1)+'s timeout').exit();},(3 * casper.options.waitTimeout));}
else if (user_system == 'mac') {
var word_file = input_word.split(']')[0].slice(1).trim();
word_file = abs_file(word_file); var fs = require('fs'); if (!fs.exists(word_file))
casper.echo('ERROR - cannot find Word file ' + word_file).exit();
var word_steps = 'tell application "Finder" to open POSIX file "' + word_file + '"\r\n';
word_steps += 'delay 5\r\ntell application "System Events"\r\n\t';
word_steps += 'keystroke "a" using {command down}\r\n\tdelay 1\r\n\t';
word_steps += 'keystroke "c" using {command down}\r\n\tdelay 1\r\n\t';
word_steps += 'keystroke "q" using {command down}\r\nend tell\r\n';
word_steps += 'do shell script "pbpaste > word_steps.out 2>&1"'; save_text('word_steps.scpt', word_steps);
casper.waitForExec('osascript word_steps.scpt', null, function(response) {
word_result = ''; word_result = require('fs').read('word_steps.out').trim();
}, function() {this.echo('ERROR - Word automation exceeded '+(3 * casper.options.waitTimeout/1000).toFixed(1)+'s timeout').exit();},(3 * casper.options.waitTimeout));}
else casper.echo('ERROR - unsupported operating system ' + user_system).exit();}

function write_word(output_word) { // for writing to word target
casper.echo('ERROR - writing to Word file not supported').exit();}

// for word statements - retrieving data for variable on right side of = sign
// broken into 2 functions for word_result to be usable with CasperJS structure
function word_retrieve(right_param) { // check OS before starting Word automation
if (user_system != 'windows' && user_system != 'mac') {word_result = '';
casper.echo('ERROR - Word automation only for Windows and Mac').exit();}
if (right_param.match(/\[.*\.(doc|docx|docm|dot|dotx)\]/i) == null)
{word_result = ''; word_result = eval(right_param);}
else if (word_result == '[LIVE_MODE]') {word_result = '';
casper.echo('ERROR - reading from Word not supported in live mode');}
else {word_result = ''; read_word(right_param);}}

// for word statements - assigning data to variable on left side of = sign
// broken into 2 functions for word_result to be usable with CasperJS structure
function word_assign(left_param) {if (left_param.match(/\[.*\.(doc|docx|docm|dot|dotx)\]/i) == null)
eval(left_param + ' = word_result'); else write_word(left_param);}

function read_pdf(input_pdf) { // for reading from pdf target
if (user_system == 'windows') {
var pdf_file = input_pdf.split(']')[0].slice(1).trim();
pdf_file = abs_file(pdf_file); var fs = require('fs'); if (!fs.exists(pdf_file))
casper.echo('ERROR - cannot find PDF file ' + pdf_file).exit();
var pdf_steps = 'Set WshShell = WScript.CreateObject("WScript.Shell")\r\n';
pdf_steps += 'WshShell.Run """' + windows_path(pdf_file) + '"""\r\nWScript.Sleep 5000\r\n';
pdf_steps += 'WshShell.SendKeys "^a"\r\nWScript.Sleep 1000\r\n';
pdf_steps += 'WshShell.SendKeys "^c"\r\nWScript.Sleep 1000\r\n';
pdf_steps += 'WshShell.SendKeys "^q"\r\nSet objHTML = CreateObject("htmlfile")\r\n';
pdf_steps += 'WScript.Echo objHTML.ParentWindow.ClipboardData.GetData("text")'; save_text('pdf_steps.vbs', pdf_steps);
save_text('pdf_steps.cmd', '@echo off\r\ncscript pdf_steps.vbs //NoLogo > pdf_steps.out 2>&1');
casper.waitForExec('pdf_steps.cmd', null, function(response) {
pdf_result = ''; pdf_result = require('fs').read('pdf_steps.out').trim();
}, function() {this.echo('ERROR - PDF automation exceeded '+(3 * casper.options.waitTimeout/1000).toFixed(1)+'s timeout').exit();},(3 * casper.options.waitTimeout));}
else if (user_system == 'mac') {
var pdf_file = input_pdf.split(']')[0].slice(1).trim();
pdf_file = abs_file(pdf_file); var fs = require('fs'); if (!fs.exists(pdf_file))
casper.echo('ERROR - cannot find PDF file ' + pdf_file).exit();
var pdf_steps = 'tell application "Finder" to open POSIX file "' + pdf_file + '"\r\n';
pdf_steps += 'delay 5\r\ntell application "System Events"\r\n\t';
pdf_steps += 'keystroke "a" using {command down}\r\n\tdelay 1\r\n\t';
pdf_steps += 'keystroke "c" using {command down}\r\n\tdelay 1\r\n\t';
pdf_steps += 'keystroke "q" using {command down}\r\nend tell\r\n';
pdf_steps += 'do shell script "pbpaste > pdf_steps.out 2>&1"'; save_text('pdf_steps.scpt', pdf_steps);
casper.waitForExec('osascript pdf_steps.scpt', null, function(response) {
pdf_result = ''; pdf_result = require('fs').read('pdf_steps.out').trim();
}, function() {this.echo('ERROR - PDF automation exceeded '+(3 * casper.options.waitTimeout/1000).toFixed(1)+'s timeout').exit();},(3 * casper.options.waitTimeout));}
else casper.echo('ERROR - unsupported operating system ' + user_system).exit();}

function write_pdf(output_pdf) { // for writing to pdf target
casper.echo('ERROR - writing to PDF file not supported').exit();}

// for pdf statements - retrieving data for variable on right side of = sign
// broken into 2 functions for pdf_result to be usable with CasperJS structure
function pdf_retrieve(right_param) { // check OS before starting PDF automation
if (user_system != 'windows' && user_system != 'mac') {pdf_result = '';
casper.echo('ERROR - PDF automation only for Windows and Mac').exit();}
if (right_param.match(/\[.*\.pdf\]/i) == null)
{pdf_result = ''; pdf_result = eval(right_param);}
else if (pdf_result == '[LIVE_MODE]') {pdf_result = '';
casper.echo('ERROR - reading from PDF not supported in live mode');}
else {pdf_result = ''; read_pdf(right_param);}}

// for pdf statements - assigning data to variable on left side of = sign
// broken into 2 functions for pdf_result to be usable with CasperJS structure
function pdf_assign(left_param) {if (left_param.match(/\[.*\.pdf\]/i) == null)
eval(left_param + ' = pdf_result'); else write_pdf(left_param);}

// for translating multi-language flows (comments in translate.php)
function translate(script_line,direction,language) {var start_keywords = '|click|rclick|dclick|tap|move|hover|'+
'type|enter|select|choose|read|fetch|show|print|save|echo|dump|write|snap|ask|table|mouse|keyboard|wait|live|'+
'download|upload|load|receive|frame|popup|timeout|api|dom|js|vision|else if|else|if|for|while|check|';
var to_separator_keywords = '|read|fetch|save|load|dump|write|snap|table|download|receive|for|'
var as_separator_keywords = '|type|enter|select|choose|upload|'; var forloop_keywords = '|from|';
var start_conditions_keywords = '|else if|if|for|while|check|'; var start_helper_keywords = '|echo|dump|write|';
var conditions_keywords = '|more than or equals to|more than or equal to|greater than or equals to|greater than or equal to|higher than or equals to|higher than or equal to|less than or equals to|less than or equal to|lesser than or equals to|lesser than or equal to|lower than or equals to|lower than or equal to|more than|greater than|higher than|less than|lesser than|lower than|not equals to|not equal to|equals to|equal to|not contains|not contain|contains|contain|and|or|';
var helper_keywords = '|title()|url()|text()|timer()|count()|present()|visible()|mouse_'+'xy()|mouse_'+'x()|mouse_'+'y()|'; // break up mouse_ helper functions to avoid mistaken triggering by tagui_parse.php as sikuli process needed
var seconds_keywords = '|seconds|second|'; var start_seconds_keywords = '|wait|timeout|';
if (!script_line || script_line == '') return '';
if (!direction || direction == '') return 'ERROR - translation engine direction parameter missing';
if (!language || language == '') return 'ERROR - translation engine language parameter missing';
if (script_line == '' || script_line == '\r\n' || script_line == '\n') return script_line;
var front_script_line_return = ''; if (script_line.charAt(0) == '\n') front_script_line_return = '\n';
var back_script_line_return = ''; if (script_line.substr(-1) == '\n') back_script_line_return = '\n';
direction = direction.toLowerCase();
if (direction !== 'to' && direction !== 'from') return 'ERROR - translation engine direction must be to or from'; 
if (direction == 'from') {var column_from = 1; var column_to = 0;} else {var column_from = 0; var column_to = 1;}
language = language.toLowerCase(); var language_count = 0;
var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\';
var language_file = 'languages' + ds + language + '.csv'; var fs = require('fs');
if (!fs.exists(language_file)) return 'ERROR - translation engine ' + language + '.csv file missing'; else {
var language_raw = fs.read(language_file); if (language_raw.indexOf('\r\n') !== -1)
var language_data = language_raw.split(/\r\n/).map(function(line) {return line.split(',');});
else var language_data = language_raw.split(/\n/).map(function(line) {return line.split(',');});
language_count = language_data.length-1;
if (!language_data[language_count][0] || language_data[language_count][0] == '') language_count--;}
script_line = '[START_OF_LINE]'+script_line.trim()+'[END_OF_LINE]'; var start_word = '[NOT_ASSIGNED]';
for (language_check = 1; language_check <= language_count; language_check++) {
if (start_keywords.indexOf('|'+language_data[language_check][0]+'|') !== -1) {
if (start_word !== '[NOT_ASSIGNED]') continue;
if ((script_line.indexOf('[START_OF_LINE]'+language_data[language_check][column_from]+' ') !== -1) || 
(script_line.indexOf('[START_OF_LINE]'+language_data[language_check][column_from]+'[END_OF_LINE]') !== -1))
start_word = language_data[language_check][0];
var regex = new RegExp('\\[START_OF_LINE\\]'+language_data[language_check][column_from]+' ','g');
script_line = script_line.replace(regex,'[START_OF_LINE]'+language_data[language_check][column_to]+' ');
var regex = new RegExp('\\[START_OF_LINE\\]'+language_data[language_check][column_from]+'\\[END_OF_LINE\\]','g');
script_line = script_line.replace(regex,'[START_OF_LINE]'+language_data[language_check][column_to]+'[END_OF_LINE]');}
else if (conditions_keywords.indexOf('|'+language_data[language_check][0]+'|') !== -1) {
if (start_word == 'check') {var array_script_line = script_line.split('|');
var regex = new RegExp(' '+language_data[language_check][column_from]+' ','g');
array_script_line[0] = array_script_line[0].replace(regex,' '+language_data[language_check][column_to]+' ');
script_line = array_script_line.join('|');}
else if ((start_word !== '[NOT_ASSIGNED]') && (start_conditions_keywords.indexOf('|'+start_word+'|') !== -1))
{var regex = new RegExp(' '+language_data[language_check][column_from]+' ','g');
script_line = script_line.replace(regex,' '+language_data[language_check][column_to]+' ');}}
else if (seconds_keywords.indexOf('|'+language_data[language_check][0]+'|') !== -1) {
if ((start_word !== '[NOT_ASSIGNED]') && (start_seconds_keywords.indexOf('|'+start_word+'|') !== -1))
{var regex = new RegExp(' '+language_data[language_check][column_from]+'\\[END_OF_LINE\\]','g');
script_line = script_line.replace(regex,' '+language_data[language_check][column_to]+'[END_OF_LINE]');}}
else if (forloop_keywords.indexOf('|'+language_data[language_check][0]+'|') !== -1) {
if (start_word == 'for')
{var regex = new RegExp(' '+language_data[language_check][column_from]+' ','g');
script_line = script_line.replace(regex,' '+language_data[language_check][column_to]+' ');}}
else if (language_data[language_check][0] == 'to') {
if ((start_word !== '[NOT_ASSIGNED]') && (to_separator_keywords.indexOf('|'+start_word+'|') !== -1))
{var regex = new RegExp(' '+language_data[language_check][column_from]+' ','g');
script_line = script_line.replace(regex,' '+language_data[language_check][column_to]+' ');}}
else if (language_data[language_check][0] == 'as') {
if ((start_word !== '[NOT_ASSIGNED]') && (as_separator_keywords.indexOf('|'+start_word+'|') !== -1))
{var regex = new RegExp(' '+language_data[language_check][column_from]+' ','g');
script_line = script_line.replace(regex,' '+language_data[language_check][column_to]+' ');}}
else if (helper_keywords.indexOf('|'+language_data[language_check][0]+'|') !== -1) {
if (((start_word !== '[NOT_ASSIGNED]') && (start_conditions_keywords.indexOf('|'+start_word+'|') !== -1))
|| ((start_word !== '[NOT_ASSIGNED]') && (start_helper_keywords.indexOf('|'+start_word+'|') !== -1))
|| (script_line.indexOf('=') !== -1))
{var regex = new RegExp((' '+language_data[language_check][column_from]).replace('(','\\(').replace(')',''),'g');
script_line = script_line.replace(regex,(' '+language_data[language_check][column_to]).replace(')',''));}}}
script_line = script_line.replace('[START_OF_LINE]','').replace('[END_OF_LINE]','');
return front_script_line_return+script_line.trim()+back_script_line_return;}

// for checking if selector is xpath selector
function is_xpath_selector(selector) {if (selector.length == 0) return false;
if ((selector.indexOf('/') == 0) || (selector.indexOf('(') == 0)) return true; return false;}

// for finding best match for given locator
function tx(locator) {if (is_xpath_selector(locator)) return xps666(locator.replace(/'/g,'"'));
if (chrome.exists(locator)) return locator; // check for css locator
// first check for exact match then check for containing string
if (chrome.exists(xps666('//*[@id="'+locator+'"]'))) return xps666('//*[@id="'+locator+'"]');
if (chrome.exists(xps666('//*[contains(@id,"'+locator+'")]'))) return xps666('//*[contains(@id,"'+locator+'")]');
if (chrome.exists(xps666('//*[@name="'+locator+'"]'))) return xps666('//*[@name="'+locator+'"]');
if (chrome.exists(xps666('//*[contains(@name,"'+locator+'")]'))) return xps666('//*[contains(@name,"'+locator+'")]');
if (chrome.exists(xps666('//*[@class="'+locator+'"]'))) return xps666('//*[@class="'+locator+'"]');
if (chrome.exists(xps666('//*[contains(@class,"'+locator+'")]'))) return xps666('//*[contains(@class,"'+locator+'")]');
if (chrome.exists(xps666('//*[@title="'+locator+'"]'))) return xps666('//*[@title="'+locator+'"]');
if (chrome.exists(xps666('//*[contains(@title,"'+locator+'")]'))) return xps666('//*[contains(@title,"'+locator+'")]');
if (chrome.exists(xps666('//*[@aria-label="'+locator+'"]'))) return xps666('//*[@aria-label="'+locator+'"]');
if (chrome.exists(xps666('//*[contains(@aria-label,"'+locator+'")]'))) return xps666('//*[contains(@aria-label,"'+locator+'")]');
if (chrome.exists(xps666('//*[text()="'+locator+'"]'))) return xps666('//*[text()="'+locator+'"]');
if (chrome.exists(xps666('//*[contains(text(),"'+locator+'")]'))) return xps666('//*[contains(text(),"'+locator+'")]');
if (chrome.exists(xps666('//*[@href="'+locator+'"]'))) return xps666('//*[@href="'+locator+'"]');
if (chrome.exists(xps666('//*[contains(@href,"'+locator+'")]'))) return xps666('//*[contains(@href,"'+locator+'")]');
return xps666('/html');}

// for checking if given locator is found
function check_tx(locator) {if (is_xpath_selector(locator))
{if (chrome.exists(xps666(locator.replace(/'/g,'"')))) return true; else return false;}
if (chrome.exists(locator)) return true; // check for css locator
// first check for exact match then check for containing string
if (chrome.exists(xps666('//*[@id="'+locator+'"]'))) return true;
if (chrome.exists(xps666('//*[contains(@id,"'+locator+'")]'))) return true;
if (chrome.exists(xps666('//*[@name="'+locator+'"]'))) return true;
if (chrome.exists(xps666('//*[contains(@name,"'+locator+'")]'))) return true;
if (chrome.exists(xps666('//*[@class="'+locator+'"]'))) return true;
if (chrome.exists(xps666('//*[contains(@class,"'+locator+'")]'))) return true;
if (chrome.exists(xps666('//*[@title="'+locator+'"]'))) return true;
if (chrome.exists(xps666('//*[contains(@title,"'+locator+'")]'))) return true;
if (chrome.exists(xps666('//*[@aria-label="'+locator+'"]'))) return true;
if (chrome.exists(xps666('//*[contains(@aria-label,"'+locator+'")]'))) return true;
if (chrome.exists(xps666('//*[text()="'+locator+'"]'))) return true;
if (chrome.exists(xps666('//*[contains(text(),"'+locator+'")]'))) return true;
if (chrome.exists(xps666('//*[@href="'+locator+'"]'))) return true;
if (chrome.exists(xps666('//*[contains(@href,"'+locator+'")]'))) return true;
return false;}

/**
 * Extra TagUI helper methods
 */

// friendlier name to use check_tx() in if condition in flow
function present(element_locator) {if (!element_locator) return false; 
if (is_sikuli(element_locator)) {var abs_param = abs_file(element_locator); var fs = require('fs');
if (sikuli_step("present " + abs_param)) return true; else return false;}
else return check_tx(element_locator);}

// present() function that waits until timeout before returning result
function exist(element_identifier) {var exist_timeout = Date.now() + casper.options.waitTimeout;
while (Date.now() < exist_timeout) {if (present(element_identifier)) return true; else sleep(100);}; return false;}

// friendlier name to check element visibility using elementVisible()
function visible(element_locator) {if (!element_locator) return false;
if (is_sikuli(element_locator)) {var abs_param = abs_file(element_locator); var fs = require('fs');
if (sikuli_step("visible " + abs_param)) return true; else return false;}
else {var element_located = tx(element_locator); var element_visible = chrome.elementVisible(element_located);
// if tx() returns xps666('/html') means that the element is not found, so set element_visible to false
if (element_located.toString() == xps666('/html').toString()) element_visible = false; return element_visible;}}

// visible() function that waits until timeout before returning result
function appeared(element_identifier) {var appeared_timeout = Date.now() + casper.options.waitTimeout;
while (Date.now() < appeared_timeout) {if (visible(element_identifier)) return true; else sleep(100);}; return false;}

// friendlier name to count elements using countElements()
function count(element_locator) {if (!element_locator) return 0;
var element_located = tx(element_locator); var element_count = chrome.countElements(element_located);
// if tx() returns xps666('/html') means that the element is not found, so set element_count to 0
if (element_located.toString() == xps666('/html').toString()) element_count = 0; return element_count;}

// friendlier name to get web page title using getTitle()
function title() {return chrome.getTitle();}

// friendlier name to get web page url using getCurrentUrl() 
function url() {return chrome.getCurrentUrl();}

// friendlier name to get web page text content using evaluate()
function text() {return chrome.evaluate(function() {return document.body.innerText || document.body.textContent;});}

function timer() { // return time elapsed in seconds between calls
var time_elapsed = ((Date.now()-timer_start_time)/1000); timer_start_time = Date.now(); return time_elapsed;}

function sleep(ms) { // helper to add delay during loops
var time_now = new Date().getTime(); var time_end = time_now + ms;
while(time_now < time_end) {time_now = new Date().getTime();}}

// return x,y coordinates of mouse cursor as string '(x,y)'
mouse_xy = function() { // use this function declaration style for sikuli detection in tagui_parse.php
sikuli_step('vision xy_mouseLocation = Env.getMouseLocation(); ' + 
'xy_x = xy_mouseLocation.getX(); xy_y = xy_mouseLocation.getY(); ' + 
"output_sikuli_text('(' + str(xy_x) + ',' + str(xy_y) + ')');");
var xy_result = fetch_sikuli_text(); clear_sikuli_text(); return xy_result;}

// return x coordinate of mouse cursor as integer number
mouse_x = function() { // use this function declaration style for sikuli detection in tagui_parse.php
sikuli_step('vision xy_mouseLocation = Env.getMouseLocation(); output_sikuli_text(str(xy_mouseLocation.getX()));');
var x_result = parseInt(fetch_sikuli_text()); clear_sikuli_text(); return x_result;}

// return y coordinate of mouse cursor as integer number
mouse_y = function() { // use this function declaration style for sikuli detection in tagui_parse.php
sikuli_step('vision xy_mouseLocation = Env.getMouseLocation(); output_sikuli_text(str(xy_mouseLocation.getY()));');
var y_result = parseInt(fetch_sikuli_text()); clear_sikuli_text(); return y_result;}

// get text from clipboard or set text to clipboard
clipboard = function(clipboard_text) { // use this function declaration style for sikuli detection in tagui_parse.php
if (!clipboard_text) {sikuli_step('vision output_sikuli_text(App.getClipboard())');
var clipboard_result = fetch_sikuli_text(); clear_sikuli_text(); return clipboard_result;}
else {vision_step('clipboard_text = ucode("' + escape_bs(clipboard_text) + '")'); // escape_bs() for \n \t etc
sikuli_step('vision App.setClipboard(clipboard_text)');}}

/**
 * string cell data sanitiser, returns a CSV formatted string
 * @param {string} cell_data
 */
function sanitise_csv_cell(cell_data) {
    // ensure numbers are converted to string
    cell_data = cell_data.toString()
    // Replace all double quotes with 2 double quotes
    cell_data = cell_data.replace(/"/g, '\"\"')
    var whitespaceCheckRegex = /\s/
    // if cell_data has a comma, or new line, or its first or last character is a
    // whitespace, then wrap the entire expression in double quotes
    if (
        cell_data.indexOf(',') >= 0
        || cell_data.indexOf('\n') >= 0
        || whitespaceCheckRegex.test(cell_data.charAt(0))
        || whitespaceCheckRegex.test(cell_data.charAt(cell_data.length - 1))
    ) {
        cell_data = '\"' + cell_data + '\"'
    }
    return cell_data
}

/**
 * Returns a CSV-formatted string that denotes a row in a CSV file
 * @param {string[]} row_data a 1-D array of strings denoting data to
 * encode as a CSV row
 */
function csv_row(original_row_data) {
    var row_data = original_row_data.slice()
    // if row_data has at least 1 element, extract and sanitise first element
    // else start_element is empty string
    var start_element = (row_data.length > 0)
        ? sanitise_csv_cell(row_data.shift())
        : ''
    // concat each row_data with a comma
    return row_data.reduce(function(accumulator, currentValue) {
        return accumulator + ',' + sanitise_csv_cell(currentValue)
    }, start_element)
}

// retrieve text between 2 provided anchors in given text content
function get_text(source_text, left_marker, right_marker, optional_count) {
    if (!source_text || !left_marker || !right_marker) return '';
    var left_position = source_text.indexOf(left_marker); if (left_position == -1) return '';
    var right_position = source_text.indexOf(right_marker, left_position+1); if (right_position == -1) return '';
    if (optional_count > 1) {var occurrence_count = 2; while(occurrence_count <= optional_count) {occurrence_count++;
        left_position = source_text.indexOf(left_marker, right_position+1); if (left_position == -1) return '';
        right_position = source_text.indexOf(right_marker, left_position+1); if (right_position == -1) return '';}}
    return source_text.slice(left_position + left_marker.length, right_position).trim();}

// return given string after deleting all occurrences of given characters
function del_chars(source_text, characters) {
    if (!source_text) return ''; else if (!characters) return source_text;
    characters = characters.replace(/\\n/g,'\n').replace(/\\r/g,'\r').replace(/\\t/g,'\t');
    characters = characters.replace(/\\f/g,'\f').replace(/\\v/g,'\v').replace(/\\\\/g,'\\');
    for (char_counter = 0; char_counter < characters.length; char_counter++) {
        if (characters[char_counter] != '\\')
            source_text = source_text.replace(new RegExp(characters[char_counter].replace(/[-[\]{}()*+?.,\\^$|]/g, "\\$&"),'g'),'');
        else
            source_text = source_text.replace(/\\/g,'');}
    return source_text;}

// return value of environment variable from operating system
function get_env(name_of_variable) { // if missing or blank name, or invalid variable, '' will be returned
if (!name_of_variable || name_of_variable == '') return '';
var value_of_variable = require('system').env[name_of_variable];
if (value_of_variable == null) return ''; else return value_of_variable;}

// return array of all the files in the given folder
function get_files(folder_path) {if (!folder_path || folder_path == '') return [];
if (!require('fs').isDirectory(abs_file(folder_path))) return [];
var files_array = require('fs').list(abs_file(folder_path));
return files_array.splice(2, files_array.length - 2);}

// for initialising integration with sikuli visual automation
function sikuli_handshake() { // techo('[connecting to sikuli process]');
var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\'; clear_sikuli_text();
var fs = require('fs'); fs.write('tagui.sikuli'+ds+'tagui_sikuli.in','','w'); var sikuli_handshake = '';
if (!fs.exists('tagui.sikuli'+ds+'tagui_sikuli.out')) fs.write('tagui.sikuli'+ds+'tagui_sikuli.out','','w');
do {sleep(500); sikuli_handshake = fs.read('tagui.sikuli'+ds+'tagui_sikuli.out').trim();}
while (sikuli_handshake !== '[0] START'); // techo('[connected to sikuli process]');
}

// for passing dynamic inputs to sikuli visual automation
function vision_step(vision_intent) {if (vision_intent.indexOf('vision ') !== 0)
vision_intent = 'vision ' + vision_intent; sikuli_step(vision_intent);}

// for using sikuli visual automation instead of casperjs
function sikuli_step(sikuli_intent) {sikuli_count++;
if (sikuli_count == 1) sikuli_handshake(); // handshake on first call
if (sikuli_intent.indexOf('snap_image()') > -1) {sikuli_intent = sikuli_intent.replace('snap_image()',snap_image());}
var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\';
var fs = require('fs'); fs.write('tagui.sikuli'+ds+'tagui_sikuli.in','['+sikuli_count.toString()+'] '+sikuli_intent,'w');
var sikuli_result = ''; do {sleep(500); sikuli_result = fs.read('tagui.sikuli'+ds+'tagui_sikuli.out').trim();}
while (sikuli_result.indexOf('['+sikuli_count.toString()+'] ') == -1);
if (sikuli_result.indexOf('SUCCESS') !== -1) return true; else return false;}

// for fetching text from sikuli optical character recognition 
function fetch_sikuli_text() {var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\';
var fs = require('fs'); if (fs.exists('tagui.sikuli'+ds+'tagui_sikuli.txt'))
return fs.read('tagui.sikuli'+ds+'tagui_sikuli.txt').trim(); else return '';}

// for clearing text from sikuli optical character recognition
function clear_sikuli_text() {var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\';
var fs = require('fs'); fs.write('tagui.sikuli'+ds+'tagui_sikuli.txt','','w');}

// for setting timeout in sikuli when looking for ui element
function sikuli_timeout(time_in_seconds) {var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\';
var fs = require('fs'); if (fs.exists('tagui.sikuli'+ds+'tagui_sikuli.in'))
{sikuli_step('vision setAutoWaitTimeout(' + time_in_seconds.toString() + ')');
sikuli_step('vision wait_timeout = ' + time_in_seconds.toString());}}

// for initialising integration with R
function r_handshake() { // techo('[connecting to R process]');
var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\'; clear_r_text();
var fs = require('fs'); fs.write('tagui_r'+ds+'tagui_r.in','','w'); var r_handshake = '';
if (!fs.exists('tagui_r'+ds+'tagui_r.out')) fs.write('tagui_r'+ds+'tagui_r.out','','w');
do {sleep(100); r_handshake = fs.read('tagui_r'+ds+'tagui_r.out').trim();}
while (r_handshake !== '[0] START'); // techo('[connected to R process]');
}

// R integration for data analytics and machine learning
function r_step(r_intent) {if (r_intent.indexOf('r ') !== 0) r_intent = 'r ' + r_intent; r_count++;
if (r_count == 1) r_handshake(); // handshake on first call
var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\';
var fs = require('fs'); fs.write('tagui_r'+ds+'tagui_r.in','['+r_count.toString()+'] '+r_intent,'w');
var r_step_result = ''; do {sleep(100); r_step_result = fs.read('tagui_r'+ds+'tagui_r.out').trim();}
while (r_step_result.indexOf('['+r_count.toString()+'] ') == -1);
if (r_step_result.indexOf('SUCCESS') !== -1) return true; else return false;}

// for fetching text from R integration execution result
function fetch_r_text() {var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\';
var fs = require('fs'); if (fs.exists('tagui_r'+ds+'tagui_r.txt'))
return fs.read('tagui_r'+ds+'tagui_r.txt').trim(); else return '';}

// for clearing text from R integration execution result
function clear_r_text() {var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\';
var fs = require('fs'); fs.write('tagui_r'+ds+'tagui_r.txt','','w');}

// for initialising integration with Python
function py_handshake() { // techo('[connecting to Python process]');
var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\'; clear_py_text();
var fs = require('fs'); fs.write('tagui_py'+ds+'tagui_py.in','','w'); var py_handshake = '';
if (!fs.exists('tagui_py'+ds+'tagui_py.out')) fs.write('tagui_py'+ds+'tagui_py.out','','w');
do {sleep(100); py_handshake = fs.read('tagui_py'+ds+'tagui_py.out').trim();}
while (py_handshake !== '[0] START'); // techo('[connected to Python process]');
}

// Python integration for data analytics and machine learning
function py_step(py_intent) {if (py_intent.indexOf('py ') !== 0) py_intent = 'py ' + py_intent; py_count++;
if (py_count == 1) py_handshake(); // handshake on first call
var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\';
var fs = require('fs'); fs.write('tagui_py'+ds+'tagui_py.in','['+py_count.toString()+'] '+py_intent,'w');
var py_step_result = ''; do {sleep(100); py_step_result = fs.read('tagui_py'+ds+'tagui_py.out').trim();}
while (py_step_result.indexOf('['+py_count.toString()+'] ') == -1);
if (py_step_result.indexOf('SUCCESS') !== -1) return true; else return false;}

// for fetching text from Python integration execution result
function fetch_py_text() {var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\';
var fs = require('fs'); if (fs.exists('tagui_py'+ds+'tagui_py.txt'))
return fs.read('tagui_py'+ds+'tagui_py.txt').trim(); else return '';}

// for clearing text from Python integration execution result
function clear_py_text() {var ds; if (flow_path.indexOf('/') !== -1) ds = '/'; else ds = '\\';
var fs = require('fs'); fs.write('tagui_py'+ds+'tagui_py.txt','','w');}

if (chrome_id > 0) { // super large if block to load chrome related functions if chrome or headless option is used
chrome_id = 0; // reset chrome_id from 1 back to 0 to prepare for initial call of chrome_step

// for initialising integration with chrome web browser
function chrome_handshake() { // techo('[connecting to chrome websocket]');
var fs = require('fs'); fs.write('tagui_chrome.in','','w'); var chrome_handshake = '';
if (!fs.exists('tagui_chrome.out')) fs.write('tagui_chrome.out','','w');
do {sleep(100); chrome_handshake = fs.read('tagui_chrome.out').trim();}
while (chrome_handshake !== '[0] START'); // techo('[connected to chrome websocket]');
}

// send websocket message to chrome browser using chrome devtools protocol
// php helper process tagui_chrome.php running to handle this concurrently
function chrome_step(method,params) {chrome_id++;
if (chrome_id == 1) chrome_handshake(); // handshake on first call
var chrome_intent = JSON.stringify({'id': chrome_id, 'method': method, 'params': params});
if (chrome_targetid !== '') chrome_intent = JSON.stringify({'id': chrome_id, 'method': 'Target.sendMessageToTarget', 'params': {'sessionId': chrome_targetid, 'message': chrome_intent}}); // send as message to target if context is popup
var fs = require('fs'); fs.write('tagui_chrome.in','['+chrome_id.toString()+'] '+chrome_intent,'w');
var chrome_result = ''; do {sleep(100); chrome_result = fs.read('tagui_chrome.out').trim();}
while (chrome_result.indexOf('['+chrome_id.toString()+'] ') == -1);
if (chrome_targetid == '') return chrome_result.substring(chrome_result.indexOf('] ')+2); // below for handling popup
else {try {var raw_json_string = JSON.stringify(JSON.parse(chrome_result.substring(chrome_result.indexOf('] ')+2)).params.message); return raw_json_string.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\n/g,"\\n");} catch(e) {return '';}}}

// chrome object for handling integration with chrome or headless chrome
var chrome = new Object(); chrome.mouse = new Object();

// chrome methods as casper methods replacement for chrome integration
chrome.exists = function(selector) { // different handling for xpath and css to support both
if ((selector.toString().length >= 16) && (selector.toString().substr(0,16) == 'xpath selector: '))
{if (selector.toString().length == 16) selector = ''; else selector = selector.toString().substring(16);
var ws_message = chrome_step('Runtime.evaluate',{expression: 'document.evaluate(\''+selector+'\','+chrome_context+',null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength'});}
else var ws_message = chrome_step('Runtime.evaluate',{expression: chrome_context+'.querySelectorAll(\''+selector+'\').length'});
try {var ws_json = JSON.parse(ws_message); if (ws_json.result.result.value > 0) return true; else return false;}
catch(e) {return false;}};

chrome.elementVisible = function(selector) { // same as chrome.exists, except for checking visibility
if ((selector.toString().length >= 16) && (selector.toString().substr(0,16) == 'xpath selector: '))
{if (selector.toString().length == 16) selector = ''; else selector = selector.toString().substring(16);
var ws_message = chrome_step('Runtime.evaluate',{expression: 'var e = document.evaluate(\''+selector+'\','+chrome_context+',null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0); var visible = false; if (!e) visible = false; else {var style = window.getComputedStyle(e); visible = style && style.display !== \'none\' && style.visibility !== \'hidden\' && style.opacity !== \'0\';}; visible'});}
else var ws_message = chrome_step('Runtime.evaluate',{expression: 'var e = '+chrome_context+'.querySelector(\''+selector+'\'); var visible = false; if (!e) visible = false; else {var style = window.getComputedStyle(e); visible = style && style.display !== \'none\' && style.visibility !== \'hidden\' && style.opacity !== \'0\';}; visible'});
try {var ws_json = JSON.parse(ws_message); if (ws_json.result.result.value == true)
return ws_json.result.result.value; else return false;}
catch(e) {return false;}};

chrome.countElements = function(selector) { // same as chrome.exists, except element count is returned
if ((selector.toString().length >= 16) && (selector.toString().substr(0,16) == 'xpath selector: '))
{if (selector.toString().length == 16) selector = ''; else selector = selector.toString().substring(16);
var ws_message = chrome_step('Runtime.evaluate',{expression: 'document.evaluate(\''+selector+'\','+chrome_context+',null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength'});}
else var ws_message = chrome_step('Runtime.evaluate',{expression: chrome_context+'.querySelectorAll(\''+selector+'\').length'});
try {var ws_json = JSON.parse(ws_message); if (ws_json.result.result.value > 0)
return ws_json.result.result.value; else return 0;}
catch(e) {return 0;}};

/* // backup of previous click implementation to experiment with Puppeteer's version
chrome.click = function(selector) { // click by sending click event instead of mouse down/up/click, then focus on element
if ((selector.toString().length >= 16) && (selector.toString().substr(0,16) == 'xpath selector: '))
{if (selector.toString().length == 16) selector = ''; else selector = selector.toString().substring(16);
chrome_step('Runtime.evaluate',{expression: 'document.evaluate(\''+selector+'\','+chrome_context+',null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).click()'}); chrome_step('Runtime.evaluate',{expression: 'document.evaluate(\''+selector+'\','+chrome_context+',null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).focus()'});}
else {chrome_step('Runtime.evaluate',{expression: chrome_context+'.querySelector(\''+selector+'\').click()'});
chrome_step('Runtime.evaluate',{expression: chrome_context+'.querySelector(\''+selector+'\').focus()'});}}; */

chrome.click = function(selector) { // click using Puppeteer's implementation - see TagUI issue #212
chrome.scrollIntoViewIfNeeded(selector); var xy = chrome.mouse.getXY(selector);
chrome.mouse.action('mouseMoved',xy.x,xy.y,'none',0);
chrome.mouse.action('mousePressed',xy.x,xy.y,'left',1); chrome.mouse.action('mouseReleased',xy.x,xy.y,'left',1);}

chrome.scrollIntoViewIfNeeded = function(selector) { // helper function to scroll element into view
if ((selector.toString().length >= 16) && (selector.toString().substr(0,16) == 'xpath selector: '))
{if (selector.toString().length == 16) selector = ''; else selector = selector.toString().substring(16);
chrome_step('Runtime.evaluate',{expression: 'document.evaluate(\''+selector+'\','+chrome_context+',null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).scrollIntoViewIfNeeded()'});}
else {chrome_step('Runtime.evaluate',{expression: chrome_context+'.querySelector(\''+selector+'\').scrollIntoViewIfNeeded()'});}}

chrome.mouse.action = function(type,x,y,button,clickCount) { // helper function to send various mouse events
chrome_step('Input.dispatchMouseEvent',{type: type, x: x, y: y, button: button, clickCount: clickCount});};

chrome.mouse.getXY = function(selector) { // helper function to get xy center coordinates of selector
if ((selector.toString().length >= 16) && (selector.toString().substr(0,16) == 'xpath selector: '))
{if (selector.toString().length == 16) selector = ''; else selector = selector.toString().substring(16);
var ws_message = chrome_step('Runtime.evaluate',{expression: 'var result_bounds = document.evaluate(\''+selector+'\','+chrome_context+',null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).getBoundingClientRect(); var result_xy = {x: Math.round(result_bounds.left + result_bounds.width / 2), y: Math.round(result_bounds.top + result_bounds.height / 2)}; result_xy', returnByValue: true});}
else var ws_message = chrome_step('Runtime.evaluate',{expression: 'var result_bounds = '+chrome_context+'.querySelector(\''+selector+'\').getBoundingClientRect(); var result_xy = {x: Math.round(result_bounds.left + result_bounds.width / 2), y: Math.round(result_bounds.top + result_bounds.height / 2)}; result_xy', returnByValue: true});
try {var ws_json = JSON.parse(ws_message); if (ws_json.result.result.value.x > 0 && ws_json.result.result.value.y > 0)
{if (chrome_context !== 'document') {ws_json.result.result.value.x += frame_step_offset_x; // add offset if in frame
ws_json.result.result.value.y += frame_step_offset_y;}; return ws_json.result.result.value;} else
{if (chrome_context !== 'document') return {x: frame_step_offset_x, y: frame_step_offset_y};
else return {x: 0, y: 0};}} catch(e) {return {x: 0, y: 0};}};

chrome.getRect = function(selector) { // helper function to get rectangle boundary coordinates of selector
if ((selector.toString().length >= 16) && (selector.toString().substr(0,16) == 'xpath selector: '))
{if (selector.toString().length == 16) selector = ''; else selector = selector.toString().substring(16);
var ws_message = chrome_step('Runtime.evaluate',{expression: 'var result_bounds = document.evaluate(\''+selector+'\','+chrome_context+',null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).getBoundingClientRect(); var result_rect = {top: Math.round(result_bounds.top), left: Math.round(result_bounds.left), width: Math.round(result_bounds.width), height: Math.round(result_bounds.height)}; result_rect', returnByValue: true});}
else var ws_message = chrome_step('Runtime.evaluate',{expression: 'var result_bounds = '+chrome_context+'.querySelector(\''+selector+'\').getBoundingClientRect(); var result_rect = {top: Math.round(result_bounds.top), left: Math.round(result_bounds.left), width: Math.round(result_bounds.width), height: Math.round(result_bounds.height)}; result_rect', returnByValue: true}); try {var ws_json = JSON.parse(ws_message); // check if width and height are valid before returning coordinates
if (ws_json.result.result.value.width > 0 && ws_json.result.result.value.height > 0)
{if (chrome_context !== 'document') {ws_json.result.result.value.left += frame_step_offset_x; // add offset if in frame
ws_json.result.result.value.top += frame_step_offset_y;}; return ws_json.result.result.value;} else
{if (chrome_context !== 'document') return {left: frame_step_offset_x, top: frame_step_offset_y, width: 0, height: 0};
else return {left: 0, top: 0, width: 0, height: 0};}} catch(e) {return {left: 0, top: 0, width: 0, height: 0};}};

chrome.mouse.move = function(selector,y) { // move mouse pointer to center of specified selector or point 
if (!y) {chrome.scrollIntoViewIfNeeded(selector); var xy = chrome.mouse.getXY(selector);}
else var xy = {x: selector, y: y}; // get coordinates accordingly
chrome.mouse.action('mouseMoved',xy.x,xy.y,'none',0);};

chrome.mouse.click = function(selector,y) { // press and release on center of specfied selector or point
if (!y) {chrome.scrollIntoViewIfNeeded(selector); var xy = chrome.mouse.getXY(selector);}
else var xy = {x: selector, y: y}; // get coordinates accordingly
chrome.mouse.action('mousePressed',xy.x,xy.y,'left',1); chrome.mouse.action('mouseReleased',xy.x,xy.y,'left',1);};

chrome.mouse.doubleclick = function(selector,y) { // double press and release on center of selector or point
if (!y) {chrome.scrollIntoViewIfNeeded(selector); var xy = chrome.mouse.getXY(selector);}
else var xy = {x: selector, y: y}; // get coordinates accordingly
chrome.mouse.action('mousePressed',xy.x,xy.y,'left',2); chrome.mouse.action('mouseReleased',xy.x,xy.y,'left',2);};

chrome.mouse.rightclick = function(selector,y) { // right click press and release on center of selector or point
if (!y) {chrome.scrollIntoViewIfNeeded(selector); var xy = chrome.mouse.getXY(selector);}
else var xy = {x: selector, y: y}; // get coordinates accordingly
chrome.mouse.action('mousePressed',xy.x,xy.y,'right',1); chrome.mouse.action('mouseReleased',xy.x,xy.y,'right',1);};

chrome.mouse.down = function(selector,y) { // left press on center of specified selector or point
if (!y) {chrome.scrollIntoViewIfNeeded(selector); var xy = chrome.mouse.getXY(selector);}
else var xy = {x: selector, y: y}; // get coordinates accordingly
chrome.mouse.action('mousePressed',xy.x,xy.y,'left',1);};

chrome.mouse.up = function(selector,y) { // left release on center of specified selector or point
if (!y) {chrome.scrollIntoViewIfNeeded(selector); var xy = chrome.mouse.getXY(selector);}
else var xy = {x: selector, y: y}; // get coordinates accordingly
chrome.mouse.action('mouseReleased',xy.x,xy.y,'left',1);};

chrome.sendKeys = function(selector,value,options) { // send key strokes to selector, options not implemented
if (value == casper.page.event.key.Enter) value = '\r';
if (value) {value = value.replace(/\[enter\]/g,'\r'); // to cater for [enter] passed in as part of a variable
value = value.replace(/\r\n/g,'\r'); // change \r\n to \r which is the enter key for chrome browser
value = value.replace(/\n/g,'\r');} // change \n to \r which is the enter key for chrome browser
if ((selector.toString().length >= 16) && (selector.toString().substr(0,16) == 'xpath selector: '))
{if (selector.toString().length == 16) selector = ''; else selector = selector.toString().substring(16);
chrome_step('Runtime.evaluate',{expression: 'document.evaluate(\''+selector+'\','+chrome_context+',null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).focus()'});}
else chrome_step('Runtime.evaluate',{expression: chrome_context+'.querySelector(\''+selector+'\').focus()'});
if (options && options.reset == true) // handling for clearing field by checking options.reset
{if ((selector.indexOf('/') == 0) || (selector.indexOf('(') == 0)) // check for xpath selector and handle accordingly
{chrome_step('Runtime.evaluate',{expression: 'var sendKeys_field = document.evaluate(\''+selector+'\','+chrome_context+',null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0); sendKeys_field.value = \'\'; var evt = document.createEvent(\'UIEvents\'); evt.initUIEvent(\'change\', true, true); sendKeys_field.dispatchEvent(evt);'});}
else chrome_step('Runtime.evaluate',{expression: 'var sendKeys_field = '+chrome_context+'.querySelector(\''+selector+'\'); sendKeys_field.value = \'\'; var evt = document.createEvent(\'UIEvents\'); evt.initUIEvent(\'change\', true, true); sendKeys_field.dispatchEvent(evt);'});}
for (var character = 0, length = value.length; character < length; character++) {
chrome_step('Input.dispatchKeyEvent',{type: 'char', text: value[character]});}};

chrome.selectOptionByValue = function(selector,valueToMatch) { // select dropdown option (base on casperjs issue #1390)
chrome.evaluate('function() {var selector = \''+selector+'\'; var valueToMatch = \''+valueToMatch+'\'; var found = false; if ((selector.indexOf(\'/\') == 0) || (selector.indexOf(\'(\') == 0)) var select = document.evaluate(selector,'+chrome_context+',null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0); else var select = '+chrome_context+'.querySelector(selector); if (valueToMatch == \'[clear]\') valueToMatch = \'\'; Array.prototype.forEach.call(select.children, function(opt, i) {if (!found && ((opt.value == valueToMatch)||(opt.text == valueToMatch))) {select.selectedIndex = i; found = true;}}); var evt = document.createEvent("UIEvents"); evt.initUIEvent("change", true, true); select.dispatchEvent(evt);}');};

chrome.fetchText = function(selector) { // grab text from selector following casperjs logic, but grab only first match
if ((selector.toString().length >= 16) && (selector.toString().substr(0,16) == 'xpath selector: '))
{if (selector.toString().length == 16) selector = ''; else selector = selector.toString().substring(16);
var ws_message = chrome_step('Runtime.evaluate',{expression: 'document.evaluate(\''+selector+'\','+chrome_context+',null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).textContent || document.evaluate(\''+selector+'\','+chrome_context+',null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).innerText || document.evaluate(\''+selector+'\','+chrome_context+',null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).value || \'\''});}
else var ws_message = chrome_step('Runtime.evaluate',{expression: chrome_context+'.querySelector(\''+selector+'\').textContent || '+chrome_context+'.querySelector(\''+selector+'\').innerText || '+chrome_context+'.querySelector(\''+selector+'\').value || \'\''});
try {var ws_json = JSON.parse(ws_message); if (ws_json.result.result.value)
return ws_json.result.result.value; else return '';} catch(e) {return '';}};

chrome.decode = function(str) { // funtion to convert base64 data to binary string
// used in https://github.com/casperjs/casperjs/blob/master/modules/clientutils.js
if (!str) return ''; // return empty string if somehow null value is passed in
var BASE64_DECODE_CHARS = [
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,
-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,
-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1];
var c1, c2, c3, c4, i = 0, len = str.length, out = ""; while (i < len) {
do {c1 = BASE64_DECODE_CHARS[str.charCodeAt(i++) & 0xff];} while (i < len && c1 === -1); if (c1 === -1) {break;}
do {c2 = BASE64_DECODE_CHARS[str.charCodeAt(i++) & 0xff];} while (i < len && c2 === -1); if (c2 === -1) {break;}
out += String.fromCharCode(c1 << 2 | (c2 & 0x30) >> 4);
do {c3 = str.charCodeAt(i++) & 0xff; if (c3 === 61) {return out;} c3 = BASE64_DECODE_CHARS[c3];}
while (i < len && c3 === -1); if (c3 === -1) {break;} out += String.fromCharCode((c2 & 0XF) << 4 | (c3 & 0x3C) >> 2);
do {c4 = str.charCodeAt(i++) & 0xff; if (c4 === 61) {return out;} c4 = BASE64_DECODE_CHARS[c4];}
while (i < len && c4 === -1); if (c4 === -1) {break;} out += String.fromCharCode((c3 & 0x03) << 6 | c4);} return out;};

chrome.capture = function(filename) { // capture screenshot of webpage to file in png/jpg/jpeg format
// having pdf extension saves to a pdf file instead. only works in headless mode, visible mode errors out
var format = 'png'; var quality = 80; var fromSurface = true; var screenshot_data = ''; // options not implemented
if ((filename.substr(-3).toLowerCase() == 'jpg') || (filename.substr(-4).toLowerCase() == 'jpeg')) format = 'jpeg';
if (filename.substr(-3).toLowerCase() == 'pdf') var ws_message = chrome_step('Page.printToPDF',{printBackground: true});
else var ws_message = chrome_step('Page.captureScreenshot',{format: format, quality: quality, fromSurface: fromSurface});
try {var ws_json = JSON.parse(ws_message); screenshot_data = ws_json.result.data;} catch(e) {screenshot_data = '';}
var fs = require('fs'); fs.write(filename,chrome.decode(screenshot_data),'wb');};

/* // backup of previous captureSelector implementation to use Page.captureScreenshot with clipping directly
chrome.captureSelector = function(filename,selector) { // capture screenshot of selector to png/jpg/jpeg format
// first capture entire screen, then use casperjs / phantomjs browser to crop image base on selector dimensions
chrome.capture(filename); var selector_rect = chrome.getRect(selector); // so that there is no extra dependency
if (selector_rect.width > 0 && selector_rect.height > 0) // from using other libraries or creating html canvas 
casper.thenOpen(file_url(filename), function() {casper . capture(filename, // spaces around . to avoid replacing 
{top: selector_rect.top, left: selector_rect.left, width: selector_rect.width, height: selector_rect.height});
casper.thenOpen('about:blank');});}; // reset phantomjs browser state */

chrome.captureSelector = function(filename,selector) { // capture screenshot of selector to png/jpg/jpeg format
var selector_rect = chrome.getRect(selector); if (selector_rect.width > 0 && selector_rect.height > 0)
{var format = 'png'; var quality = 80; var fromSurface = true; var screenshot_data = ''; // options not implemented
if ((filename.substr(-3).toLowerCase() == 'jpg') || (filename.substr(-4).toLowerCase() == 'jpeg')) format = 'jpeg';
var clip = {x:selector_rect.left, y:selector_rect.top, width:selector_rect.width, height:selector_rect.height, scale:1};
var ws_message = 
chrome_step('Page.captureScreenshot',{format: format, quality: quality, clip: clip, fromSurface: fromSurface});
try {var ws_json = JSON.parse(ws_message); screenshot_data = ws_json.result.data;} catch(e) {screenshot_data = '';}
var fs = require('fs'); fs.write(filename,chrome.decode(screenshot_data),'wb');}}

chrome.upload = function(selector,filename) { // upload function to upload file to provided selector
if ((selector.toString().length >= 16) && (selector.toString().substr(0,16) == 'xpath selector: '))
{casper.echo('ERROR - upload step is only implemented for CSS selector and not XPath selector');
casper.echo('ERROR - for consistency with PhantomJS as it only supports upload with CSS selector');}
else try {var ws_message = ""; var ws_json = {};
ws_message = chrome_step('DOM.getDocument',{});
ws_json = JSON.parse(ws_message);
ws_message = chrome_step('DOM.querySelector',{nodeId: ws_json.result.root.nodeId, selector: selector});
ws_json = JSON.parse(ws_message);
ws_message = chrome_step('DOM.setFileInputFiles',{files: [filename], nodeId: ws_json.result.nodeId});
ws_json = JSON.parse(ws_message);
ws_message = chrome_step('DOM.disable'); // disable invoked DOM agent from running and firing events
} catch(e) {casper.echo('ERROR - unable to upload ' + selector + ' as ' + filename);}};

/* // backup of previous download implementation to switch to new download to location syntax
chrome.download = function(url,filename) { // download function for downloading url resource to file
// casper download cannot be used for urls which requires login as casperjs engine can't access chrome
// the chromium issue 696481 is moving well, else an alternative may be to inject casper clientutils.js 
// TagUI by default auto-sets to allow downloads for headless Chrome (otherwise it prevents downloads)
casper.echo('ERROR - for headless and visible Chrome, download file using normal webpage interaction');}; */

chrome.download = function(location) { // download function for setting location of downloaded files
download_path = location; // to store the default download location for subsequent URL visits
// below replacement line to set path correctly on Windows to be sent to Chrome browser method
if (location.indexOf(':')>0) location = location.replace(/\//g,'\\').replace(/\\/g,'\\');
chrome_step('Page.setDownloadBehavior',{behavior: 'allow', downloadPath: location});}

chrome.evaluate = function(fn_statement,eval_json) { // evaluate expression in browser dom context
// chrome runtime.evaluate is different from casperjs evaluate, do some processing to reduce gap
var statement = fn_statement.toString(); if (!eval_json)
{statement = statement.slice(statement.indexOf('{')+1,statement.lastIndexOf('}'));
statement = statement.replace(/return /g,'');} // defining function() with return keyword is invalid for chrome
else statement = '(' + statement + ')' + '(' + JSON.stringify(eval_json) + ')'; // unless variable is passed into fx
var ws_message = chrome_step('Runtime.evaluate',{expression: statement}); // statements can be separated by ;
try {var ws_json = JSON.parse(ws_message); if (ws_json.result.result.value)
return ws_json.result.result.value; else return null;} catch(e) {return null;}};

chrome.withFrame = function(frameInfo,then) { // replace casperjs frame for switching frame context
var new_context = ''; if (chrome_context == 'document') new_context = 'mainframe_context';
else if (chrome_context == 'mainframe_context') new_context = 'subframe_context'; // below backup original offset
original_frame_step_offset_x = frame_step_offset_x; original_frame_step_offset_y = frame_step_offset_y;
casper.then(function _step() { // track frame (x,y) offset so that steps within frame work correctly
var frame_rect = chrome.getRect(xps666('(//frame|//iframe)[@name="'+frameInfo+'" or @id="'+frameInfo+'"]'));
frame_step_offset_x = frame_rect.left; frame_step_offset_y = frame_rect.top; // set offset before entering frame
chrome_step('Runtime.evaluate',{expression: new_context+' = document.evaluate(\'(//frame|//iframe)[@name="'+frameInfo+'" or @id="'+frameInfo+'"]\','+chrome_context+',null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).contentDocument'}); chrome_context = new_context;}); // set mainframe_context/subframe_context in dom
casper.then(then); casper.then(function _step() {if (chrome_context == 'subframe_context') {
chrome_step('Runtime.evaluate',{expression: 'subframe_context = null'}); chrome_context = 'mainframe_context';
frame_step_offset_x = original_frame_step_offset_x; frame_step_offset_y = original_frame_step_offset_y;}
else if (chrome_context == 'mainframe_context') {chrome_step('Runtime.evaluate',{expression: 'mainframe_context = null'});
chrome_context = 'document'; frame_step_offset_x = 0; frame_step_offset_y = 0;}});}; // reset offset after exit mainframe

chrome.waitForPopup = function(popupInfo,then,onTimeout) { // replace casperjs waitforpopup for checking popup window
casper.waitFor(function check() { // use similar logic as chrome withpopup to scan through list of browser targets
var found_popup = false; var chrome_targets = []; var ws_message = chrome_step('Target.getTargets',{});
try {var ws_json = JSON.parse(ws_message); if (ws_json.result.targetInfos) chrome_targets = ws_json.result.targetInfos;
else chrome_targets = [];} catch(e) {chrome_targets = [];} // following line scan through targets to find match
chrome_targets.forEach(function(target) {if (target.url.search(popupInfo) !== -1) found_popup = true;});
return found_popup;},then,onTimeout);};

chrome.withPopup = function(popupInfo,then) { // replace casperjs withpopup for handling popup window
casper.then(function _step() { // get list of targets, find a match, attach to the target and set chrome_targetid
var found_targetid = ''; var chrome_targets = []; var ws_message = chrome_step('Target.getTargets',{});
try {var ws_json = JSON.parse(ws_message); if (ws_json.result.targetInfos) chrome_targets = ws_json.result.targetInfos;
else chrome_targets = [];} catch(e) {chrome_targets = [];} // following line scan through targets to find match
chrome_targets.forEach(function(target) {if (target.url.search(popupInfo) !== -1) found_targetid = target.targetId;});
if (found_targetid !== '') {var ws_message = chrome_step('Target.attachToTarget',{targetId: found_targetid});
try {var ws_json = JSON.parse(ws_message); if (ws_json.result.sessionId !== '')
found_targetid = ws_json.result.sessionId; else found_targetid = '';} catch(e) {found_targetid = ''};}
chrome_targetid = found_targetid;}); // set chrome_targetid only after attaching to found target successfully
casper.then(then); casper.then(function _step() {if (chrome_targetid !== '') // detach from target after running then
{var found_targetid = chrome_targetid; chrome_targetid = ''; chrome_step('Target.detachFromTarget',{sessionId: found_targetid});}});};

chrome.getHTML = function() { // get raw html of current webpage
var ws_message = chrome_step('Runtime.evaluate',{expression: 'document.documentElement.outerHTML'});
try {var ws_json = JSON.parse(ws_message); if (ws_json.result.result.value)
return ws_json.result.result.value; else return '';} catch(e) {return '';}};

chrome.getTitle = function() { // get title of current webpage
var ws_message = chrome_step('Runtime.evaluate',{expression: 'document.title'});
try {var ws_json = JSON.parse(ws_message); if (ws_json.result.result.value)
return ws_json.result.result.value; else return '';} catch(e) {return '';}};

chrome.getCurrentUrl = function() { // get url of current webpage
var ws_message = chrome_step('Runtime.evaluate',{expression: 'document.location.href'});
try {var ws_json = JSON.parse(ws_message); // chrome returns below value on empty dead url
if (ws_json.result.result.value == 'data:text/html,chromewebdata') ws_json.result.result.value = 'about:blank';
if (ws_json.result.result.value) return ws_json.result.result.value; else return '';} catch(e) {return '';}};

chrome.debugHTML = function() {casper.echo(chrome.getHTML());}; // print raw html of current webpage

chrome.reload = function() { // reload the current webpage, then not implemented
var ws_message = chrome_step('Runtime.evaluate',{expression: 'document.location.reload()'});
try {var ws_json = JSON.parse(ws_message); if (ws_json.result.result.value)
return ws_json.result.result.value; else return '';} catch(e) {return '';}};

chrome.back = function() { // move back a step in browser history
var ws_message = chrome_step('Runtime.evaluate',{expression: 'window.history.back()'});
try {var ws_json = JSON.parse(ws_message); if (ws_json.result.result.value)
return ws_json.result.result.value; else return '';} catch(e) {return '';}};

chrome.forward = function() { // move forward a step in browser history
var ws_message = chrome_step('Runtime.evaluate',{expression: 'window.history.forward()'});
try {var ws_json = JSON.parse(ws_message); if (ws_json.result.result.value)
return ws_json.result.result.value; else return '';} catch(e) {return '';}};

chrome.echo = function(value) {casper.echo(value);}; // use casper echo to print output

chrome.on = function(value,statement) {casper.on(value,statement);}; // use casper event system

} // end of super large if block to load chrome related functions if chrome or headless option is used

// for live mode simple parsing of tagui steps into js code
function tagui_parse(raw_input) {if (tagui_language.toLowerCase() == 'english') return parse_intent(raw_input);
else {var translated_string = translate(raw_input,'from',tagui_language.toLowerCase());
if (translated_string.indexOf('ERROR - translation engine') !== -1) casper.echo(translated_string).exit();
else return parse_intent(translated_string);}}

// for live mode interpretation of step into casperjs code
function parse_intent(live_line) {
live_line = live_line.trim(); if (live_line == '') return '';
if (['run','dom','js','r','py','vision','code'].indexOf(get_intent(live_line)) == -1) live_line = escape_quote(live_line);
live_line = parse_variables(live_line); live_line = live_line.trim(); if (live_line == '') return '';
// convert 'wait for' step to 'hover' step, to wait until timeout for element to appear and hover on it
if ((live_line.length > 9) && ((live_line.substr(0,9)).toLowerCase() == 'wait for '))
live_line = 'hover ' + live_line.substr(9);

switch (get_intent(live_line)) {
case 'url': return url_intent(live_line); break;
case 'tap': return tap_intent(live_line); break;
case 'rtap': return rtap_intent(live_line); break;
case 'dtap': return dtap_intent(live_line); break;
case 'hover': return hover_intent(live_line); break;
case 'type': return type_intent(live_line); break;
case 'select': return select_intent(live_line); break;
case 'read': return read_intent(live_line); break;
case 'show': return show_intent(live_line); break;
case 'upload': return upload_intent(live_line); break;
case 'down': return down_intent(live_line); break;
case 'receive': return receive_intent(live_line); break;
case 'echo': return echo_intent(live_line); break;
case 'save': return save_intent(live_line); break;
case 'dump': return dump_intent(live_line); break;
case 'write': return write_intent(live_line); break;
case 'load': return load_intent(live_line); break;
case 'snap': return snap_intent(live_line); break;
case 'table': return table_intent(live_line); break;
case 'wait': return wait_intent(live_line); break;
case 'live': return live_intent(live_line); break;
case 'ask': return ask_intent(live_line); break;
case 'telegram': return telegram_intent(live_line); break;
case 'keyboard': return keyboard_intent(live_line); break;
case 'mouse': return mouse_intent(live_line); break;
case 'check': return check_intent(live_line); break;
case 'test': return test_intent(live_line); break;
case 'frame': return frame_intent(live_line); break;
case 'popup': return popup_intent(live_line); break;
case 'api': return api_intent(live_line); break;
case 'run': return run_intent(live_line); break;
case 'dom': return dom_intent(live_line); break;
case 'js': return js_intent(live_line); break;
case 'r': return r_intent(live_line); break;
case 'py': return py_intent(live_line); break;
case 'vision': return vision_intent(live_line); break;
case 'timeout': return timeout_intent(live_line); break;
case 'excel': return excel_intent(live_line); break;
case 'word': return word_intent(live_line); break;
case 'pdf': return pdf_intent(live_line); break;
case 'code': return code_intent(live_line); break;
default: return "this.echo('ERROR - cannot understand step " + live_line.replace(/'/g,'\\\'') + "')";}}

function escape_quote(script_line) { // helper function for string context intents
if (script_line == '') return ''; current_context = 'string'; // default is string
script_line = script_line.replace(/\\\'/g,'\''); // for backward compatibility
for (char_counter = 0; char_counter < script_line.length; char_counter++) {
if ((script_line.charAt(char_counter) == "'") && (current_context == 'string'))
{script_line = script_line.substr(0,char_counter) + '\\\'' + script_line.substr(char_counter+1); char_counter++;}
if (script_line.charAt(char_counter) == "`")
{if (current_context == 'string') current_context = 'code'; else current_context = 'string';}} return script_line;}

function parse_variables(script_line) { // `variable` --> '+variable+'
// use "[SINGLE_QUOTE_FOR_VARIABLE_HANDLING]" instead of "'" to prevent escaping ' in escape_bs()
quote_token = "[SINGLE_QUOTE_FOR_VARIABLE_HANDLING]+escape_bs("; // token to alternate replacements for '+variable+'
for (char_counter = 0; char_counter < script_line.length; char_counter++) {
if (script_line.charAt(char_counter) == "`") {
script_line = script_line.substr(0,char_counter) + quote_token + script_line.substr(char_counter+1);
if (quote_token == "[SINGLE_QUOTE_FOR_VARIABLE_HANDLING]+escape_bs(")
quote_token = ")+[SINGLE_QUOTE_FOR_VARIABLE_HANDLING]";
else quote_token = "[SINGLE_QUOTE_FOR_VARIABLE_HANDLING]+escape_bs(";}
if (quote_token == ")+[SINGLE_QUOTE_FOR_VARIABLE_HANDLING]") { // protect code context from escape_bs()
if (script_line.charAt(char_counter) == "'") script_line = script_line.substr(0,char_counter) +
"[SINGLE_QUOTE_FOR_VARIABLE_HANDLING]" + script_line.substr(char_counter+1);
else if (script_line.charAt(char_counter) == '"') script_line = script_line.substr(0,char_counter) +
"[DOUBLE_QUOTE_FOR_VARIABLE_HANDLING]" + script_line.substr(char_counter+1);}} return script_line;}

// for live mode understanding intent of line entered
function get_intent(raw_intent) {var lc_raw_intent = raw_intent.toLowerCase();
if (inside_py_block !== 0) return 'py'; if (inside_r_block !== 0) return 'r';
if (inside_run_block !== 0) return 'run'; if (inside_vision_block !== 0) return 'vision';
if (inside_js_block !== 0) return 'js'; if (inside_dom_block !== 0) return 'dom';

if (lc_raw_intent.substr(0,7) == 'http://' || lc_raw_intent.substr(0,8) == 'https://' || lc_raw_intent.substr(0,4) == 'www.') return 'url';

// first set of conditions check for valid keywords with their parameters
if ((lc_raw_intent.substr(0,4) == 'tap ') || (lc_raw_intent.substr(0,6) == 'click ')) return 'tap';
if ((lc_raw_intent.substr(0,5) == 'rtap ') || (lc_raw_intent.substr(0,7) == 'rclick ')) return 'rtap';
if ((lc_raw_intent.substr(0,5) == 'dtap ') || (lc_raw_intent.substr(0,7) == 'dclick ')) return 'dtap';
if ((lc_raw_intent.substr(0,6) == 'hover ') || (lc_raw_intent.substr(0,5) == 'move ')) return 'hover';
if ((lc_raw_intent.substr(0,5) == 'type ') || (lc_raw_intent.substr(0,6) == 'enter ')) return 'type';
if ((lc_raw_intent.substr(0,7) == 'select ') || (lc_raw_intent.substr(0,7) == 'choose ')) return 'select';
if ((lc_raw_intent.substr(0,5) == 'read ') || (lc_raw_intent.substr(0,6) == 'fetch ')) return 'read';
if ((lc_raw_intent.substr(0,5) == 'show ') || (lc_raw_intent.substr(0,6) == 'print ')) return 'show';
if ((lc_raw_intent.substr(0,3) == 'up ') || (lc_raw_intent.substr(0,7) == 'upload ')) return 'upload';
if ((lc_raw_intent.substr(0,5) == 'down ') || (lc_raw_intent.substr(0,9) == 'download ')) return 'down';
if (lc_raw_intent.substr(0,8) == 'receive ') return 'receive';
if (lc_raw_intent.substr(0,5) == 'echo ') return 'echo';
if (lc_raw_intent.substr(0,5) == 'save ') return 'save';
if (lc_raw_intent.substr(0,5) == 'dump ') return 'dump';
if (lc_raw_intent.substr(0,6) == 'write ') return 'write';
if (lc_raw_intent.substr(0,5) == 'load ') return 'load';
if (lc_raw_intent.substr(0,5) == 'snap ') return 'snap';
if (lc_raw_intent.substr(0,6) == 'table ') return 'table';
if (lc_raw_intent.substr(0,5) == 'wait ') return 'wait';
if (lc_raw_intent.substr(0,5) == 'live ') return 'live';
if (lc_raw_intent.substr(0,4) == 'ask ') return 'ask';
if (lc_raw_intent.substr(0,9) == 'telegram ') return 'telegram';
if (lc_raw_intent.substr(0,9) == 'keyboard ') return 'keyboard';
if (lc_raw_intent.substr(0,6) == 'mouse ') return 'mouse';
if (lc_raw_intent.substr(0,6) == 'check ') return 'check';
if (lc_raw_intent.substr(0,5) == 'test ') return 'test';
if (lc_raw_intent.substr(0,6) == 'frame ') return 'frame';
if (lc_raw_intent.substr(0,6) == 'popup ') return 'popup';
if (lc_raw_intent.substr(0,4) == 'api ') return 'api';
if (lc_raw_intent.substr(0,4) == 'run ') return 'run';
if (lc_raw_intent.substr(0,4) == 'dom ') return 'dom';
if (lc_raw_intent.substr(0,3) == 'js ') return 'js';
if ((lc_raw_intent.substr(0,2) == 'r ') && (lc_raw_intent.substr(0,3) != 'r =')) return 'r';
if (lc_raw_intent.substr(0,3) == 'py ') return 'py';
if (lc_raw_intent.substr(0,7) == 'vision ') return 'vision';
if (lc_raw_intent.substr(0,8) == 'timeout ') return 'timeout';

// second set of conditions check for valid keywords with missing parameters
if ((lc_raw_intent == 'tap') || (lc_raw_intent == 'click')) return 'tap';
if ((lc_raw_intent == 'rtap') || (lc_raw_intent == 'rclick')) return 'rtap';
if ((lc_raw_intent == 'dtap') || (lc_raw_intent == 'dclick')) return 'dtap';
if ((lc_raw_intent == 'hover') || (lc_raw_intent == 'move')) return 'hover';
if ((lc_raw_intent == 'type') || (lc_raw_intent == 'enter')) return 'type';
if ((lc_raw_intent == 'select') || (lc_raw_intent == 'choose')) return 'select';
if ((lc_raw_intent == 'read') || (lc_raw_intent == 'fetch')) return 'read';
if ((lc_raw_intent == 'show') || (lc_raw_intent == 'print')) return 'show';
if ((lc_raw_intent == 'up') || (lc_raw_intent == 'upload')) return 'upload';
if ((lc_raw_intent == 'down') || (lc_raw_intent == 'download')) return 'down';
if (lc_raw_intent == 'receive') return 'receive';
if (lc_raw_intent == 'echo') return 'echo';
if (lc_raw_intent == 'save') return 'save';
if (lc_raw_intent == 'dump') return 'dump';
if (lc_raw_intent == 'write') return 'write';
if (lc_raw_intent == 'load') return 'load';
if (lc_raw_intent == 'snap') return 'snap';
if (lc_raw_intent == 'table') return 'table';
if (lc_raw_intent == 'wait') return 'wait';
if (lc_raw_intent == 'live') return 'live';
if (lc_raw_intent == 'ask') return 'ask';
if (lc_raw_intent == 'telegram') return 'telegram';
if (lc_raw_intent == 'keyboard') return 'keyboard';
if (lc_raw_intent == 'mouse') return 'mouse';
if (lc_raw_intent == 'check') return 'check';
if (lc_raw_intent == 'test') return 'test';
if (lc_raw_intent == 'frame') return 'frame';
if (lc_raw_intent == 'popup') return 'popup';
if (lc_raw_intent == 'api') return 'api';
if (lc_raw_intent == 'run') return 'run';
if (lc_raw_intent == 'dom') return 'dom';
if (lc_raw_intent == 'js') return 'js';
if (lc_raw_intent == 'r') return 'r';
if (lc_raw_intent == 'py') return 'py';
if (lc_raw_intent == 'vision') return 'vision';
if (lc_raw_intent == 'timeout') return 'timeout';

// check using regex for excel assignment
if (is_excel(raw_intent)) return 'excel';

// check using regex for word assignment
if (is_word(raw_intent)) return 'word';

// check using regex for pdf assignment
if (is_pdf(raw_intent)) return 'pdf';

// final check for recognized code before returning error
if (is_code(raw_intent)) return 'code'; else return 'error';}

function is_excel(raw_intent) {if (raw_intent.indexOf('=') == -1) return false;
if (raw_intent.indexOf('//') == 0) return false; // skip processing if commented out 
if (raw_intent.match(/\[.*\.(xl.|xl..|xml|csv)\].*![A-Z0-9]*/i) == null) return false; else return true;}

function is_word(raw_intent) {if (raw_intent.indexOf('=') == -1) return false;
if (raw_intent.indexOf('//') == 0) return false; // skip processing if commented out
if (raw_intent.match(/\[.*\.(doc|docx|docm|dot|dotx)\]/i) == null) return false; else return true;}

function is_pdf(raw_intent) {if (raw_intent.indexOf('=') == -1) return false;
if (raw_intent.indexOf('//') == 0) return false; // skip processing if commented out
if (raw_intent.match(/\[.*\.pdf\]/i) == null) return false; else return true;}

function is_code(raw_intent) {
// due to asynchronous waiting for element, if/for/while can work for parsing single step
// other scenarios can be assumed to behave as unparsed javascript in casperjs context
// to let if/for/while handle multiple steps/code use the { and } steps to define block
if ((raw_intent.substr(0,4) == 'var ') || (raw_intent.substr(0,3) == 'do ')) return true;
if ((raw_intent.substr(0,1) == '{') || (raw_intent.substr(0,1) == '}')) return true;
if ((raw_intent.charAt(raw_intent.length-1) == '{') || (raw_intent.charAt(raw_intent.length-1) == '}')) return true;
if ((raw_intent.substr(0,3) == 'if ') || (raw_intent.substr(0,4) == 'else')) return true;
if ((raw_intent.substr(0,4) == 'for ') || (raw_intent.substr(0,6) == 'while ')) return true;
if ((raw_intent.substr(0,7) == 'switch ') || (raw_intent.substr(0,5) == 'case ')) return true;
if ((raw_intent.substr(0,6) == 'break;') || (raw_intent == 'break')) return true;
if ((raw_intent.substr(0,9) == 'continue;') || (raw_intent == 'continue')) return true;
if ((raw_intent.substr(0,7) == 'casper.') || (raw_intent.substr(0,5) == 'this.')) return true;
if (raw_intent.substr(0,7) == 'chrome.') return true; // chrome object for chrome integration
// below breaking up the single word clip+board( in order not to trigger false sikuli loading
if (raw_intent.substr(0,10) == ('clip'+'board(')) return true; // for handling clip+board('text')
if (raw_intent.substr(0,7) == 'timer()') return true; // for handling timer() helper function
if (raw_intent.substr(0,5) == ('test'+'.')) return true; // avoid replacement with test option
if ((raw_intent.substr(0,2) == '//') || (raw_intent.charAt(raw_intent.length-1) == ';')) return true;
if (raw_intent.substr(0,9) == 'function ') return true; // function definition
// assume = is assignment statement, kinda acceptable as this is checked at the very end
if (raw_intent.indexOf('=') > -1) return true; return false;}

function file_url(absolute_filename) { // helper function to append file:// according for opening local files
if (!absolute_filename || absolute_filename == '') return '';
if (absolute_filename.substr(0,1) == '/') return 'file://' + absolute_filename;
if (absolute_filename.substr(1,1) == ':') return 'file:///' + absolute_filename; return absolute_filename;}

function abs_file(filename) { // helper function to return absolute filename
if (filename == '') return ''; // unlike tagui_parse.php not deriving path from script variable
if (filename.substr(0,1) == '/') return filename; // return mac/linux absolute filename directly
if (filename.substr(1,1) == ':') return filename.replace(/\\/g,'/'); // return windows absolute filename directly
if (filename.length > 9 && filename.substr(-9).toLowerCase() == 'using ocr') return filename; // to handle using ocr
if (is_coordinates(filename)) return filename; // to handle when sikuli (x,y) coordinates locator is provided
var tmp_flow_path = flow_path; // otherwise use flow_path defined in generated script to build absolute filename
// above str_replace is because casperjs/phantomjs do not seem to support \ for windows paths, replace with / to work
if (tmp_flow_path.indexOf('/') > -1) return (tmp_flow_path + '/' + filename).replace(/\\/g,'/');
else return tmp_flow_path + '\\' + filename;}

function add_concat(source_string) { // parse string and add missing + concatenator
return source_string; // deprecated in v6 for consistency with rest of TagUI steps
if ((source_string.indexOf("'") == -1) && (source_string.indexOf('"') == -1)) var quote_type = "none";
else if ((source_string.indexOf("'") > -1) && (source_string.indexOf('"') == -1)) var quote_type = "'";
else if ((source_string.indexOf("'") == -1) && (source_string.indexOf('"') > -1)) var quote_type = '"';
else if (source_string.indexOf("'") < source_string.indexOf('"')) var quote_type = "'"; else var quote_type = '"';
var within_quote = false; source_string = source_string.trim(); // trim for future proof
var previous_char = ""; // to help detect backslash escape for quotes
for (srcpos = 0; srcpos < source_string.length; srcpos++) {
if ((source_string.charAt(srcpos) == quote_type) && (previous_char !== "\\")) within_quote = !(within_quote);
previous_char = source_string.charAt(srcpos); // to detect a previous backlash escape and ignore quote
if ((within_quote == false) && (source_string.charAt(srcpos) == " "))
source_string = source_string.substring(0,srcpos) + "+" + source_string.substring(srcpos+1);}
source_string = source_string.replace(/\+\+\+\+\+/g,'+'); source_string = source_string.replace(/\+\+\+\+/g,'+');
source_string = source_string.replace(/\+\+\+/g,'+'); source_string = source_string.replace(/\+\+/g,'+');
return source_string;} // replacing multiple variations of + to handle user typos of double spaces etc

function escape_bs(input_string) { // helper function to escape backslash characters and friends
if (!input_string) return ''; input_string = String(input_string); // to handle variable input that is a number
escaped_string = input_string.replace(/\\/g,'\\\\').replace(/\'/g,'\\\'').replace(/\n/g,'\\n').replace(/\r/g,'\\r');
escaped_string = escaped_string.replace(/\t/g,'\\t').replace(/\f/g,'\\f').replace(/\v/g,'\\v').replace(/\"/g,'\\\"');
escaped_string = escaped_string.replace(/\[SINGLE_QUOTE_FOR_VARIABLE_HANDLING\]/g,'\'');
return escaped_string.replace(/\[DOUBLE_QUOTE_FOR_VARIABLE_HANDLING\]/g,'\"');}

function esc_bs(input_string) { // helper to escape backslash to echo properly
if (!input_string) return ''; input_string = String(input_string); return input_string.replace(/\\/g,'\\\\');}

function is_coordinates(input_params) { // helper function to check if string is (x,y) coordinates
if ((input_params.length > 4) && (input_params.substr(0,1) == '(') && (input_params.substr(-1) == ')') 
&& (input_params.split(',').length == 2 || input_params.split(',').length == 3) 
&& (!input_params.match(/[a-z]/i))) return true; else return false;}

function is_sikuli(input_params) { // helper function to check if input is meant for sikuli visual automation
if (input_params.length > 4 && input_params.substr(-4).toLowerCase() == '.png') return true; // support png and bmp
else if (input_params.length > 4 && input_params.substr(-4).toLowerCase() == '.bmp') return true;
else if (input_params.length > 9 && input_params.substr(-9).toLowerCase() == 'using ocr') return true;
else if (is_coordinates(input_params)) return true; else return false;}

function call_sikuli(input_intent,input_params,other_actions) { // helper function to use sikuli visual automation
if (input_intent.length > 9 && input_intent.substr(-9).toLowerCase() == 'using ocr')
var use_ocr = 'true'; else var use_ocr = 'false';  // to track if it is a text locator using OCR
var fs = require('fs'); // use phantomjs fs file system module to access files and directories
fs.write('tagui.sikuli/tagui_sikuli.in', '', 'w'); fs.write('tagui.sikuli/tagui_sikuli.out', '', 'w');
if (!fs.exists('tagui.sikuli/tagui_sikuli.in')) return "this.echo('ERROR - cannot initialise tagui_sikuli.in')";
if (!fs.exists('tagui.sikuli/tagui_sikuli.out')) return "this.echo('ERROR - cannot initialise tagui_sikuli.out')";
if (!other_actions) other_actions = ''; // to handle most cases where other_actions is not passed in during call
return "var fs = require('fs'); if (!sikuli_step('"+input_intent+"')) if (!fs.exists('"+input_params+"') && !" +
use_ocr + ") " + "this.echo('ERROR - cannot find image file "+input_params+"'); " +
"else this.echo('ERROR - cannot find "+input_params+" on screen'); " + other_actions;}

function call_r(input_intent) { // helper function to use R integration for data analytics and machine learning
var fs = require('fs'); // use phantomjs fs file system module to access files and directories
fs.write('tagui_r/tagui_r.in', '', 'w'); fs.write('tagui_r/tagui_r.out', '', 'w');
if (!fs.exists('tagui_r/tagui_r.in')) return "this.echo('ERROR - cannot initialise tagui_r.in')";
if (!fs.exists('tagui_r/tagui_r.out')) return "this.echo('ERROR - cannot initialise tagui_r.out')";
return "r_result = ''; if (!r_step('"+input_intent+"')) this.echo('ERROR - cannot execute R command(s)'); else {r_result = fetch_r_text(); clear_r_text(); try {r_json = JSON.parse(r_result);} catch(e) {r_json = JSON.parse('null');}}";}

function call_py(input_intent) { // helper function to use Python integration for data analytics and machine learning
var fs = require('fs'); // use phantomjs fs file system module to access files and directories
fs.write('tagui_py/tagui_py.in', '', 'w'); fs.write('tagui_py/tagui_py.out', '', 'w');
if (!fs.exists('tagui_py/tagui_py.in')) return "this.echo('ERROR - cannot initialise tagui_py.in')";
if (!fs.exists('tagui_py/tagui_py.out')) return "this.echo('ERROR - cannot initialise tagui_py.out')";
return "py_result = ''; if (!py_step('"+input_intent+"')) this.echo('ERROR - cannot execute Python command(s)'); else {py_result = fetch_py_text(); clear_py_text(); try {py_json = JSON.parse(py_result);} catch(e) {py_json = JSON.parse('null');}}";}

function url_intent(raw_intent) {if (raw_intent.toLowerCase().substr(0,4) == 'www.') raw_intent = 'https://' + raw_intent;
raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
if (chrome_id == 0) return "this.echo('ERROR - step only supported in live mode using Chrome browser')";
else return "chrome.evaluate(function() {window.location.href = \"" + raw_intent + "\"})";}

function tap_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
if (is_sikuli(params)) {var abs_params = abs_file(params); var abs_intent = raw_intent.replace(params,abs_params);
return call_sikuli(abs_intent,abs_params);} // use sikuli visual automation as needed
if (params == '') return "this.echo('ERROR - target missing for " + raw_intent + "')";
else if (check_tx(params)) return "chrome.click(tx('" + params + "'))";
else return "this.echo('ERROR - cannot find " + params + "')";}

function rtap_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
if (is_sikuli(params)) {var abs_params = abs_file(params); var abs_intent = raw_intent.replace(params,abs_params);
return call_sikuli(abs_intent,abs_params);} // use sikuli visual automation as needed
if (params == '') return "this.echo('ERROR - target missing for " + raw_intent + "')";
else if (check_tx(params)) return "chrome.mouse.rightclick(tx('" + params + "'))";
else return "this.echo('ERROR - cannot find " + params + "')";}

function dtap_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
if (is_sikuli(params)) {var abs_params = abs_file(params); var abs_intent = raw_intent.replace(params,abs_params);
return call_sikuli(abs_intent,abs_params);} // use sikuli visual automation as needed
if (params == '') return "this.echo('ERROR - target missing for " + raw_intent + "')";
else if (check_tx(params)) return "chrome.mouse.doubleclick(tx('" + params + "'))";
else return "this.echo('ERROR - cannot find " + params + "')";}

function hover_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
if (is_sikuli(params)) {var abs_params = abs_file(params); var abs_intent = raw_intent.replace(params,abs_params);
return call_sikuli(abs_intent,abs_params);} // use sikuli visual automation as needed
if (params == '') return "this.echo('ERROR - target missing for " + raw_intent + "')";
else if (check_tx(params)) return "chrome.mouse.move(tx('" + params + "'))";
else return "this.echo('ERROR - cannot find " + params + "')";}

function type_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
var param1 = (params.substr(0,params.indexOf(' as '))).trim();
var param2 = (params.substr(4+params.indexOf(' as '))).trim();
if (is_sikuli(param1) && param2 !== '') {
var abs_param1 = abs_file(param1); var abs_intent = raw_intent.replace(param1,abs_param1);
return call_sikuli(abs_intent,abs_param1);} // use sikuli visual automation as needed
if ((param1 == '') || (param2 == '')) return "this.echo('ERROR - target/text missing for " + raw_intent + "')";
else if (check_tx(param1)) 
{if (param2.indexOf('[clear]') == 0) {if (param2.length>7) param2 = param2.substr(7); else param2 = "";
clear_field = "chrome.sendKeys(tx('" + param1 + "'),'',{reset: true}); ";} else clear_field = "";
if (param2.indexOf('[enter]') == -1) return clear_field + "chrome.sendKeys(tx('" + param1 + "'),'" + param2 + "')";
else // special handling to send enter key events
{param2 = param2.replace(/\[enter\]/g,"',{keepFocus: true}); chrome.sendKeys(tx('" + param1 + "'),casper.page.event.key.Enter,{keepFocus: true}); chrome.sendKeys(tx('" + param1 + "'),'");
return clear_field + "chrome.sendKeys(tx('" + param1 + "'),'" + param2 + "',{keepFocus: true});";}}
else return "this.echo('ERROR - cannot find " + param1 + "')";}

function select_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
var param1 = (params.substr(0,params.indexOf(' as '))).trim();
var param2 = (params.substr(4+params.indexOf(' as '))).trim();
if (is_sikuli(param1) && is_sikuli(param2)) {
var abs_param1 = abs_file(param1); var abs_intent = raw_intent.replace(param1,abs_param1);
var abs_param2 = abs_file(param2); abs_intent = abs_intent.replace(param2,abs_param2);
return call_sikuli(abs_intent,abs_param1);} // use sikuli visual automation as needed
if ((param1 == '') || (param2 == '')) return "this.echo('ERROR - target/option missing for " + raw_intent + "')";
else if (check_tx(param1)) return "var select_locator = tx('" + param1 + "'); if (is_xpath_selector(select_locator.toString().replace('xpath selector: ',''))) select_locator = select_locator.toString().substring(16).replace(/'/g,'\"'); chrome.selectOptionByValue(select_locator,'" + param2 + "');";
else return "this.echo('ERROR - cannot find " + param1 + "')";}

function read_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
var param1 = (params.substr(0,params.indexOf(' to '))).trim();
var param2 = (params.substr(4+params.indexOf(' to '))).trim();
if (is_sikuli(param1) && (params.indexOf(' to ') > -1)) { // use sikuli visual automation as needed
var abs_param1 = abs_file(param1); var abs_intent = raw_intent.replace(param1,abs_param1);
return call_sikuli(abs_intent,abs_param1,param2 + ' = fetch_sikuli_text(); clear_sikuli_text();');}
if ((param1.toLowerCase() == 'page') && (param2 !== '')) return param2 + " = chrome.getHTML()";
if ((param1 == '') || (param2 == '')) return "this.echo('ERROR - target/variable missing for " + raw_intent + "')";
else if (check_tx(param1)) return param2 + " =  chrome.fetchText(tx('" + param1 + "')).trim()";
else return "this.echo('ERROR - cannot find " + param1 + "')";}

function show_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
if (is_sikuli(params)) { // use sikuli visual automation as needed
var abs_params = abs_file(params); var abs_intent = raw_intent.replace(params,abs_params);
return call_sikuli(abs_intent,abs_params,'this.echo(fetch_sikuli_text()); clear_sikuli_text();');}
if (params.toLowerCase() == 'page') return "this.echo('" + raw_intent + "' + ' - ' + '\\n' + chrome.getHTML())";
if (params == '') return "this.echo('ERROR - target missing for " + raw_intent + "')";
else if (check_tx(params)) return "this.echo(chrome.fetchText(tx('" + params + "')).trim())";else return "this.echo('ERROR - cannot find " + params + "')";}

function upload_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
var param1 = (params.substr(0,params.indexOf(' as '))).trim();
var param2 = (params.substr(4+params.indexOf(' as '))).trim();
if ((param1 == '') || (param2 == '')) return "this.echo('ERROR - filename missing for " + raw_intent + "')";
else if (check_tx(param1)) return "chrome.upload(tx('" + param1 + "'),'" + abs_file(param2) + "')";
else return "this.echo('ERROR - cannot find " + param1 + "')";}

function down_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
if (params.substr(0,3) != 'to ') params = 'to ' + params; // handle user missing out to separator
var param1 = (params.substr(0,params.indexOf('to '))).trim();
var param2 = (params.substr(3+params.indexOf('to '))).trim();
if (param2 == '') return "this.echo('ERROR - location missing for " + raw_intent + "')";
else return "chrome.download('" + abs_file(param2) + "')";}

function receive_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
return "this.echo('ERROR - step not supported in live mode, it requires creating CasperJS event')";}

function echo_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
if (params == '') return "this.echo('')"; else return "this.echo('" + add_concat(params) + "')";}

function save_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
var param1 = (params.substr(0,params.indexOf(' to '))).trim();
var param2 = (params.substr(4+params.indexOf(' to '))).trim();
if (is_sikuli(param1) && (params.indexOf(' to ') > -1)) { // use sikuli visual automation as needed
var abs_param1 = abs_file(param1); var abs_intent = raw_intent.replace(param1,abs_param1);
return call_sikuli(abs_intent,abs_param1,'save_text(\''+abs_file(param2)+'\',fetch_sikuli_text()); clear_sikuli_text();');}
else if (is_sikuli(params) && (params.indexOf(' to ') == -1)) {
var abs_params = abs_file(params); var abs_intent = raw_intent.replace(params,abs_params);
return call_sikuli(abs_intent,abs_param1,'save_text(\'\',fetch_sikuli_text()); clear_sikuli_text();');}
if ((params.toLowerCase() == 'page') || (param1.toLowerCase() == 'page')) {
if (params.indexOf(' to ') > -1) return "save_text('" + abs_file(param2) + "',chrome.getHTML())";
else return "save_text('',chrome.getHTML())";}
if (params == '') return "this.echo('ERROR - target missing for " + raw_intent + "')";
else if (params.indexOf(' to ') > -1)
{if (check_tx(param1)) return "save_text('" + abs_file(param2) + "',chrome.fetchText(tx('" + param1 + "')).trim())";
else return "this.echo('ERROR - cannot find " + param1 + "')";}
else {if (check_tx(params)) return "save_text('',chrome.fetchText(tx('" + params + "')).trim())";
else return "this.echo('ERROR - cannot find " + params + "')";}}

function dump_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
var param1 = (params.substr(0,params.lastIndexOf(' to '))).trim();
var param2 = (params.substr(4+params.lastIndexOf(' to '))).trim();
if (params == '') return "this.echo('ERROR - variable missing for " + raw_intent + "')";
else if (params.lastIndexOf(' to ') > -1)
return "save_text('" + abs_file(param2) + "','" + add_concat(param1) + "')"; else
return "save_text('','" + add_concat(params) + "')";}

function write_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
var param1 = (params.substr(0,params.lastIndexOf(' to '))).trim();
var param2 = (params.substr(4+params.lastIndexOf(' to '))).trim();
if (params == '') return "this.echo('ERROR - variable missing for " + raw_intent + "')";
else if (params.lastIndexOf(' to ') > -1)
return "append_text('" + abs_file(param2) + "','" + add_concat(param1) + "')"; else
return "append_text('','" + add_concat(params) + "')";}

function load_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
var param1 = (params.substr(0,params.lastIndexOf(' to '))).trim();
var param2 = (params.substr(4+params.lastIndexOf(' to '))).trim();
if (params == '') return "this.echo('ERROR - filename missing for " + raw_intent + "')";
else if (params.lastIndexOf(' to ') > -1)
return "var fs = require('fs'); " + param2 + " = ''; if (fs.exists('" + abs_file(param1) + "')) " + param2 +  " = fs.read('" + abs_file(param1) + "').trim(); else this.echo('ERROR - cannot find file " + esc_bs(param1) + "')"; else
return "this.echo('ERROR - variable missing for " + esc_bs(raw_intent) + "')";}

function snap_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
var param1 = (params.substr(0,params.indexOf(' to '))).trim();
var param2 = (params.substr(4+params.indexOf(' to '))).trim();
if (is_sikuli(param1) && (params.indexOf(' to ') > -1)) {
var abs_param1 = abs_file(param1); var abs_intent = raw_intent.replace(param1,abs_param1);
var abs_param2 = abs_file(param2); abs_intent = abs_intent.replace(param2,abs_param2);
return call_sikuli(abs_intent,abs_param1);} // use sikuli visual automation as needed
else if (is_sikuli(params) && (params.indexOf(' to ') == -1)) {
var abs_params = abs_file(params); var abs_intent = raw_intent.replace(params,abs_params);
return call_sikuli(abs_intent + ' to snap_image()',abs_params);} // handle no output filename
if ((params.toLowerCase() == 'page') || (param1.toLowerCase() == 'page')) {
if (params.indexOf(' to ') > -1) return "chrome.capture('" + abs_file(param2) + "')";
else return "chrome.capture(snap_image())";}
if (params == '') return "this.echo('ERROR - target missing for " + raw_intent + "')";
else if (params.indexOf(' to ') > -1)
{if (check_tx(param1)) return "chrome.captureSelector('" + abs_file(param2) + "',tx('" + param1 + "'))"; 
else return "this.echo('ERROR - cannot find " + param1 + "')";}
else {if (check_tx(params)) return "chrome.captureSelector(snap_image(),tx('" + params + "'))";
else return "this.echo('ERROR - cannot find " + params + "')";}}

function table_identifier(given_identifier) {if (!given_identifier) return '';
if (isNaN(given_identifier)) return given_identifier; else return '(//table)[' + parseInt(given_identifier) + ']';}

function table_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
var param1 = (params.substr(0,params.indexOf(' to '))).trim();
var param2 = (params.substr(4+params.indexOf(' to '))).trim();
if (params == '') return "this.echo('ERROR - target missing for " + raw_intent + "')";
else if (params.indexOf(' to ') > -1) {if (check_tx(table_identifier(param1)))
return "save_table('" + abs_file(param2) + "',tx('" + table_identifier(param1) + "'))";
else return "this.echo('ERROR - cannot find " + table_identifier(param1) + "')";}
else {if (check_tx(table_identifier(params))) return "save_table('',tx('" + table_identifier(params) + "'))";
else return "this.echo('ERROR - cannot find " + table_identifier(params) + "')";}}

function wait_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
return "this.echo('ERROR - waiting for some time is not relevant in live mode')";}

function live_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
return "this.echo('ERROR - you are already in live mode, type done to quit live mode')";}

function ask_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
return "this.echo('ERROR - step is not relevant in live mode, set ask_result directly')";}

function telegram_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
var param1 = (params.substr(0,params.indexOf(' '))).trim(); var param2 = (params.substr(1+params.indexOf(' '))).trim();
if ((param1 == '') || (param2 == '')) return "this.echo('ERROR - chat_id/message missing for " + raw_intent + "')";
else return "telegram_result = ''; " +
"telegram_chat_id = encodeURIComponent('"+param1+"'); " + "telegram_message = encodeURIComponent('"+param2+"'); " +
"telegram_result = call_api(telegram_endpoint+'/sendMessage.php?chat_id='+telegram_chat_id+'&text='+telegram_message); " +
"try {telegram_json = JSON.parse(telegram_result); telegram_result = 'fail'; " +
"if (telegram_json.ok) telegram_result = 'success';} " + "catch(e) {telegram_result = 'fail';}";}

function keyboard_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
if (params == '') return "this.echo('ERROR - keys to type missing for " + raw_intent + "')";
else return call_sikuli(raw_intent,params);}

function mouse_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
if (params == '') return "this.echo('ERROR - down / up missing for " + raw_intent + "')";
else if (params.toLowerCase() == 'down') return call_sikuli(raw_intent,'down');
else if (params.toLowerCase() == 'up') return call_sikuli(raw_intent,'up');
else return "this.echo('ERROR - cannot understand step " + raw_intent + "')";}

function check_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
return "this.echo('ERROR - step not supported in live mode, there is no conditions language parser')";}

function test_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
return "this.echo('ERROR - use CasperJS tester module to professionally " + raw_intent + "\\nERROR - info at http://docs.casperjs.org/en/latest/modules/tester.html\\nERROR - support CSS selector or tx(\\'selector\\') for XPath algo by TagUI')";}

function frame_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
return "this.echo('ERROR - step not supported in live mode, it is meant for trying single steps')";}

function popup_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
return "this.echo('ERROR - step not supported in live mode, it is meant for trying single steps')";}

function api_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
if (params == '') return "this.echo('ERROR - API URL missing for " + raw_intent + "')";
else return "api_result = ''; api_result = call_api('" + params + "'); " +
"try {api_json = JSON.parse(api_result);} catch(e) {api_json = JSON.parse('null');}";}

function run_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
return "this.echo('ERROR - step not supported in live mode, as run output cannot be retrieved')";}

function dom_intent(raw_intent) { // code to support dynamic variables not applicable
if (raw_intent.toLowerCase() == 'dom begin') {inside_dom_block = 1; return '';}
else if (raw_intent.toLowerCase() == 'dom finish') {inside_dom_block = 0; return '';}
if (inside_dom_block == 1) raw_intent = 'dom ' + raw_intent;
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
if (params == '') return "this.echo('ERROR - statement missing for " + raw_intent + "')";
else return "dom_result = ''; dom_result = chrome.evaluate(function(dom_json) {" + params + "}, dom_json)";}

function js_intent(raw_intent) { // code to support dynamic variables not applicable
if (raw_intent.toLowerCase() == 'js begin') {inside_js_block = 1; return '';}
else if (raw_intent.toLowerCase() == 'js finish') {inside_js_block = 0; return '';}
if (inside_js_block == 1) raw_intent = 'js ' + raw_intent;
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
if (params == '') return "this.echo('ERROR - statement missing for " + raw_intent + "')";
else return check_chrome_context(params);}

function r_intent(raw_intent) { // code to support dynamic variables not applicable
if (raw_intent.toLowerCase() == 'r begin') {inside_r_block = 1; return '';}
else if (raw_intent.toLowerCase() == 'r finish') {inside_r_block = 0; return '';}
if (inside_r_block == 1) raw_intent = 'r ' + raw_intent;
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
if (params == '') return "this.echo('ERROR - R command(s) missing for " + raw_intent + "')";
else return call_r(raw_intent.replace(/\\/g,'\\\\').replace(/'/g,'\\\''));}

function py_intent(raw_intent) { // code to support dynamic variables not applicable
if (raw_intent.toLowerCase() == 'py begin') {inside_py_block = 1; return '';}
else if (raw_intent.toLowerCase() == 'py finish') {inside_py_block = 0; return '';}
if (inside_py_block == 1) raw_intent = 'py ' + raw_intent;
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
if (params == '') return "this.echo('ERROR - Python command(s) missing for " + raw_intent + "')";
else return call_py(raw_intent.replace(/\\/g,'\\\\').replace(/'/g,'\\\''));}

function vision_intent(raw_intent) { // code to support dynamic variables not applicable
if (raw_intent.toLowerCase() == 'vision begin') {inside_vision_block = 1; return '';}
else if (raw_intent.toLowerCase() == 'vision finish') {inside_vision_block = 0; return '';}
if (inside_vision_block == 1) raw_intent = 'vision ' + raw_intent;
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
if (params == '') return "this.echo('ERROR - Sikuli command(s) missing for " + raw_intent + "')";
else return call_sikuli(raw_intent.replace(/\\/g,'\\\\').replace(/'/g,'\\\''),'for vision step');}

function timeout_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
var params = ((raw_intent + ' ').substr(1+(raw_intent + ' ').indexOf(' '))).trim();
if (params == '') return "this.echo('ERROR - time in seconds missing for " + raw_intent + "')";
else return check_chrome_context("casper.options.waitTimeout = " + (parseFloat(params)*1000).toString() + "; sikuli_timeout(" + parseFloat(params).toString() + ");");}

function excel_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
if (user_system != 'windows' && user_system != 'mac')
{return "excel_result = ''; this.echo('ERROR - Excel automation only for Windows and Mac')";}
var excel_params=raw_intent.split('='); var left_param=excel_params[0].trim(); var right_param=excel_params[1].trim();
if (excel_params[2]) right_param += '=' + excel_params[2].trim(); // to handle case of formula assignments eg "=A1"
left_param = esc_bs(left_param); right_param = esc_bs(right_param); // to escape backslash \ in Windows folder paths
left_param = left_param.replace(/\\\\'/g, "\\'"); right_param = right_param.replace(/\\\\'/g, "\\'");
if ((left_param == '') || (right_param == '')) return "this.echo('ERROR - parameter missing for " + raw_intent + "')";
else return "excel_result = '[LIVE_MODE]'; excel_retrieve('" + right_param + "'); excel_assign('" + left_param + "')";}

function word_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
if (user_system != 'windows' && user_system != 'mac')
{return "word_result = ''; this.echo('ERROR - Word automation only for Windows and Mac')";}
var word_params = raw_intent.split('='); var left_param = word_params[0].trim(); var right_param = word_params[1].trim();
left_param = esc_bs(left_param); right_param = esc_bs(right_param); // to escape backslash \ in Windows folder paths
left_param = left_param.replace(/\\\\'/g, "\\'"); right_param = right_param.replace(/\\\\'/g, "\\'");
if ((left_param == '') || (right_param == '')) return "this.echo('ERROR - parameter missing for " + raw_intent + "')";
else return "word_result = '[LIVE_MODE]'; word_retrieve('" + right_param + "'); word_assign('" + left_param + "')";}

function pdf_intent(raw_intent) {raw_intent = eval("'" + escape_bs(raw_intent) + "'"); // support dynamic variables
if (user_system != 'windows' && user_system != 'mac')
{return "pdf_result = ''; this.echo('ERROR - PDF automation only for Windows and Mac')";}
var pdf_params = raw_intent.split('='); var left_param = pdf_params[0].trim(); var right_param = pdf_params[1].trim();
left_param = esc_bs(left_param); right_param = esc_bs(right_param); // to escape backslash \ in Windows folder paths
left_param = left_param.replace(/\\\\'/g, "\\'"); right_param = right_param.replace(/\\\\'/g, "\\'");
if ((left_param == '') || (right_param == '')) return "this.echo('ERROR - parameter missing for " + raw_intent + "')";
else return "pdf_result = '[LIVE_MODE]'; pdf_retrieve('" + right_param + "'); pdf_assign('" + left_param + "')";}

function code_intent(raw_intent) { // code to support dynamic variables not applicable
return check_chrome_context(raw_intent);}

function check_chrome_context(source_code) { // function to convert javascript code to chrome context
// specifically for live mode, as statements in flow file are already converted by tagui_parse.php
if (chrome_id == 0) return source_code; // if chrome or headless option is used, chrome_id will be > 0
source_code = source_code.replace(/casper\.exists/g,'chrome.exists').replace(/this\.exists/g,'chrome.exists');
source_code = source_code.replace(/casper\.click/g,'chrome.click').replace(/this\.click/g,'chrome.click');
source_code = source_code.replace(/casper\.mouse/g,'chrome.mouse').replace(/this\.mouse/g,'chrome.mouse');
source_code = source_code.replace(/casper\.sendKeys/g,'chrome.sendKeys').replace(/this\.sendKeys/g,'chrome.sendKeys');
source_code = source_code.replace(/casper\.selectOptionByValue/g,'chrome.selectOptionByValue').replace(/this\.selectOptionByValue/g,'chrome.selectOptionByValue');
source_code = source_code.replace(/casper\.countElements/g,'chrome.countElements').replace(/this\.countElements/g,'chrome.countElements');
source_code = source_code.replace(/casper\.elementVisible/g,'chrome.elementVisible').replace(/this\.elementVisible/g,'chrome.elementVisible');
source_code = source_code.replace(/casper\.fetchText/g,'chrome.fetchText').replace(/this\.fetchText/g,'chrome.fetchText');
source_code = source_code.replace(/casper\.capture/g,'chrome.capture').replace(/this\.capture/g,'chrome.capture');
source_code = source_code.replace(/casper\.captureSelector/g,'chrome.captureSelector').replace(/this\.captureSelector/g,'chrome.captureSelector');
source_code = source_code.replace(/chrome\.page\.uploadFile/g,'chrome.upload').replace(/casper\.page\.uploadFile/g,'chrome.upload').replace(/this\.page\.uploadFile/g,'chrome.upload');
source_code = source_code.replace(/casper\.download/g,'chrome.download').replace(/this\.download/g,'chrome.download');
source_code = source_code.replace(/casper\.evaluate/g,'chrome.evaluate').replace(/this\.evaluate/g,'chrome.evaluate');
source_code = source_code.replace(/casper\.getHTML/g,'chrome.getHTML').replace(/this\.getHTML/g,'chrome.getHTML');
source_code = source_code.replace(/casper\.getTitle/g,'chrome.getTitle').replace(/this\.getTitle/g,'chrome.getTitle');
source_code = source_code.replace(/casper\.getCurrentUrl/g,'chrome.getCurrentUrl').replace(/this\.getCurrentUrl/g,'chrome.getCurrentUrl');
source_code = source_code.replace(/casper\.debugHTML/g,'chrome.debugHTML').replace(/this\.debugHTML/g,'chrome.debugHTML');
source_code = source_code.replace(/casper\.reload/g,'chrome.reload').replace(/this\.reload/g,'chrome.reload');
source_code = source_code.replace(/casper\.back/g,'chrome.back').replace(/this\.back/g,'chrome.back');
source_code = source_code.replace(/casper\.forward/g,'chrome.forward').replace(/this\.forward/g,'chrome.forward');
return source_code;};

// for calling rest api url synchronously
function call_api(rest_url) { // advance users can define api_config for advance calls
// the api_config variable defaults to {method:'GET', header:[], body:{}}
try {var xhttp = new XMLHttpRequest(); xhttp.open(api_config.method, rest_url, false);
for (var item=0;item<api_config.header.length;item++) { // process headers
if (api_config.header[item] == '') continue; // skip if header is not defined
var header_value_pair = api_config.header[item].split(':'); // format is 'Header_name: header_value'
xhttp.setRequestHeader(header_value_pair[0].trim(),header_value_pair[1].trim());}
xhttp.send(JSON.stringify(api_config.body)); return xhttp.responseText;} catch(e) {return '';}}

// custom function to handle dropdown option
casper.selectOptionByValue = function(selector, valueToMatch) { // solution posted in casperjs issue #1390
chrome.evaluate(function(selector, valueToMatch) {var found = false; // modified to allow xpath / css locators
if ((selector.indexOf('/') == 0) || (selector.indexOf('(') == 0)) var select = __utils__.getElementByXPath(selector);
else var select = document.querySelector(selector); // auto-select xpath or query css method to get element
if (valueToMatch == '[clear]') valueToMatch = ''; // [clear] keyword to allow selecting empty / blank option
Array.prototype.forEach.call(select.children, function(opt, i) { // loop through list to select option
if (!found && ((opt.value == valueToMatch)||(opt.text == valueToMatch))) {select.selectedIndex = i; found = true;}});
var evt = document.createEvent("UIEvents"); // dispatch change event in case there is validation
evt.initUIEvent("change", true, true); select.dispatchEvent(evt);}, selector, valueToMatch);};

// custom function to return element visibility
casper.elementVisible = function(selector) {return casper.visible(selector);} // use casperjs to maximize compatibility

// custom function to return element count
casper.countElements = function(selector) { // use casperjs in-built function to maximize compatibility
var count_result = chrome.evaluate(function(selector) {return __utils__.findAll(selector).length;},selector);
try {if (count_result > 0) return count_result; else return 0;} catch(e) {return 0;}};

// custom function from casperjs v1.1.5 (not yet released)
casper.waitForExec = function (command, parameters, then, onTimeout, timeout) {
    "use strict";
    var killTimeout;
    var utils = require('utils'); var f = utils.format; // custom added line from casper.js global
    if (utils.isArray(timeout)) {
        killTimeout = utils.isNumber(timeout[1]) ? getTimeoutAndCheckNextStepFunction(timeout[1], then, 'waitForExec', this.options.waitTimeout) : getTimeoutAndCheckNextStepFunction(timeout[0], then, 'waitForExec', this.options.waitTimeout);
        timeout = getTimeoutAndCheckNextStepFunction(timeout[0], then, 'waitForExec', this.options.waitTimeout);
    } else {
        timeout = getTimeoutAndCheckNextStepFunction(timeout, then, 'waitForExec', this.options.waitTimeout);
        killTimeout = timeout;
    }

    if ( (!utils.isString(command)) && (!utils.isArray(parameters))  ) {
        throw new CasperError("waitForExec() needs an command string as program and parameters separated by space to run or an array of parameters. if program is falsy or not a string, it uses default system shell");
    }
    if (utils.isFalsy(command) || !utils.isString(command)) {
        var system = require('system');
        command = (system.env.SHELL || system.env.ComSpec); // SHELL for UNIX(?), ComSpec for Windows(?)
        this.log('Casper.waitForExec()  is going to use default system shell ' + JSON.stringify(command) + ' - command is falsy or is not a string', "warning");
    }
    if (utils.isFalsy(parameters) || !utils.isArray(parameters)) {
        parameters = [];
    }

    // add use of a escape char like '\'??? (e.g.: '/bin/bash -c {\ ls\ /\ &&\ ls\ /home\ }' becomes ['/bin/bash', '-c', '{ ls / && ls /home }']
    command = command.split(' ');
    parameters = command.splice(1,(command.length-1)).concat(parameters);
    command = command[0];
    var fs = require('fs');
    if (!fs.isExecutable(command)) {
        this.log('Casper.waitForExec() is going to call non executable file ' + JSON.stringify(command) + ' - maybe runs if is in PATH', "warning");
    }

    var spawn = require("child_process").spawn;
    var stdout = ''; // VARIABLE TO STORE PROGRAM STDOUT
    var stderr = ''; // VARIABLE TO STORE PROGRAM STDERR
    var exitCode = null; // VARIABLE TO STORE PROGRAM EXIT CODE
    var realPid = null; // VARIABLE TO STORE PROGRAM REAL PID
    var elapsedTime = null; // VARIABLE TO STORE PROGRAM DURATION
    var childStartTime = new Date().getTime();
    var child = spawn(command, parameters);
    realPid = child.pid;

    child.stdout.on("data", function (standardOut) { // keeps stdout updated
        stdout += standardOut;
    });
    child.stderr.on("data", function (standardError) { // keeps stderr updated
        stderr += standardError;
    });
    child.on("exit", function (code) {
        elapsedTime = (new Date().getTime()) - childStartTime;
        exitCode = code;
    });

    function __details() {
        return {data: {command: command, parameters: parameters, pid: realPid, stdout: stdout, stderr: stderr, exitCode: exitCode, elapsedTime: elapsedTime, isChildNotFinished: (exitCode == null) }};
    }
    function __onTimeout(timeout, details) {
        var __onWaitTimeout = onTimeout ? onTimeout : this.options.onWaitTimeout;
        var signalToKill = "SIGTERM";
        child.kill(signalToKill);
        
        killTimeout = getTimeoutAndCheckNextStepFunction(killTimeout, __onWaitTimeout, 'killAndCallOnWaitTimeout', this.options.waitTimeout, false);
        (function killAndCallOnWaitTimeout() {
            this.waitFor(function isProgramKilled() { // HAVE TO ADD waitFor() TO MAKE child.on("exit"... UPDATES exitCode AND TO child.pid BE UPDATED
                return (exitCode != null);
            }, function onProgramKilled() { 
                    this.log(f("waitForExec() has killed %s %s (PID %d) with %s", details.data.command, JSON.stringify(details.data.parameters), details.data.pid, signalToKill), "info");
                    // this.then(this.createStep(__onWaitTimeout, timeout, __details()));
                    __onWaitTimeout.call(this, timeout, __details());
            }, function onProgramNotKilled() {
                    this.log(f("waitForExec() has not killed %s %s (PID %d) with %s", details.data.command, JSON.stringify(details.data.parameters), details.data.pid, signalToKill), "warning");
                    signalToKill = (require('system').os.name !== "windows") ? "SIGKILL" : "WM_QUIT"; // "WM_QUIT" SEEMS TO BE THE WINDOWS EQUIVALENT TO UNIX SIGKILL
                    child.kill(signalToKill);
                    killTimeout = 1;
                    killAndCallOnWaitTimeout.call(this);
            }, killTimeout);
        }).call(this);
    }
    this.log(f("waitForExec() called %s (PID %d) with %s arguments", JSON.stringify(command), realPid, JSON.stringify(parameters)), "info");
    return this.waitFor(function isProgramFinished() {
        return (exitCode != null);
    }, function onProgramFinished() {
        this.then(this.createStep(then, __details()));
    }, __onTimeout, timeout, __details());
};

// dependency function of casper.waitForExec in v1.1.5 (not yet released)
function getTimeoutAndCheckNextStepFunction(timeout, then, methodName, defaultTimeout, isThenRequired) {
    var utils = require('utils'); // custom added line from casper.js global
    if (isThenRequired || then) {
        var isFunction = utils.isFunction(then); // Optimization to perform "isFunction" check only once.

        if (isThenRequired && !isFunction) {
            throw new CasperError(methodName + "() needs a step function");
        } else if (then && !isFunction) {
            throw new CasperError(methodName + "() next step definition must be a function");
        }
    }

    timeout = ~~timeout || ~~defaultTimeout;
    if (timeout < 0) {
        throw new CasperError(methodName + "() only accepts an integer >= 0 as a timeout value");
    }

    return timeout;
}

// global try-catch for catching unexpected and unhandled errors, eg referencing an undeclared variable
phantom.onError = function(msg, trace) {if (msg.indexOf('Error:') !== -1) { // clean up and format error message
msg = msg.substring(msg.indexOf('Error:')+6).trim(); msg = msg.charAt(0).toLowerCase() + msg.slice(1);}
casper.echo('ERROR - ' + msg).exit();}

// flow path for save_text and snap_image
var flow_path = 'D:/workspace_rpa3/tango-rpa/temp_tagui';

// TagUI script for logging into the website
// Visit the login page
casper.start('about:blank', function() {
if (download_path == '') download_path = flow_path; // below to set path correctly for Windows
if (download_path.indexOf(':')>0) download_path = download_path.replace(/\//g,'\\').replace(/\\/g,'\\');
chrome_step('Page.setDownloadBehavior',{behavior: 'allow', downloadPath: download_path});
chrome_step('Page.navigate',{url: 'https://the-internet.herokuapp.com/login'}); sleep(1000);
techo('https://the-internet.herokuapp.com/login' + ' - ' + chrome.getTitle() + '\n');});

casper.then(function() {{techo('type username as tomsmith');
casper.waitFor(function check() {return check_tx('username');},
function then() {chrome.sendKeys(tx('username'),'tomsmith');},
function timeout() {chrome.capture('D:/workspace_rpa3/tango-rpa/temp_tagui/demo2_20250326_101428_458_66_error.png');
this.echo('ERROR - cannot find username').exit(); this.wait(0);});}});

casper.then(function() {{techo('type password as SuperSecretPassword!');
casper.waitFor(function check() {return check_tx('password');},
function then() {chrome.sendKeys(tx('password'),'SuperSecretPassword!');},
function timeout() {chrome.capture('D:/workspace_rpa3/tango-rpa/temp_tagui/demo2_20250326_101428_458_66_error.png');
this.echo('ERROR - cannot find password').exit(); this.wait(0);});}});

// Click the login button
casper.then(function() {{techo('click //html/body/div[2]/div/div/form/button');
casper.waitFor(function check() {return check_tx('//html/body/div[2]/div/div/form/button');},
function then() {chrome.click(tx('//html/body/div[2]/div/div/form/button'));},
function timeout() {chrome.capture('D:/workspace_rpa3/tango-rpa/temp_tagui/demo2_20250326_101428_458_66_error.png');
this.echo('ERROR - cannot find //html/body/div[2]/div/div/form/button').exit(); this.wait(0);});}});

// Wait for a while to see the result
casper.then(function() {techo('wait 5');});
casper.then(function() {casper.wait(5000, function() {});});

casper.then(function() {if (excel_files.length != 0) excel_close();});

casper.then(function() {techo('\n' + chrome.getCurrentUrl() + ' - ' + chrome.getTitle());
techo('FINISH - automation finished - ' + ((Date.now()-automation_start_time)/1000).toFixed(1) + 's\n');});

casper.run();
