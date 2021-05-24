import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import * as ace from 'ace-builds'; // ace module ..
// language package, choose your own
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
// ui-theme package
import 'ace-builds/src-noconflict/theme-katzenmilch';
import 'ace-builds/src-noconflict/theme-dracula';

import 'ace-builds/src-noconflict/keybinding-vscode';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CodeService } from '../CodeService';

const THEME = 'ace/theme/dracula';
const KEY = 'ace/keyboard/vscode';

@Component({
  selector: 'app-ace-code',
  templateUrl: './ace-code.component.html',
  styleUrls: ['./ace-code.component.css'],
})
export class AceCodeComponent implements OnInit, AfterViewInit {
  @ViewChild('codeEditor') codeEditorElmRef: ElementRef;
  private codeEditor: ace.Ace.Editor;
  private editorBeautify;
  languages = ['javascript', 'java', 'python'];
  language = 'javascript';
  defaultTests = [];
  defaultSignature;
  enonce;

  constructor(private http: HttpClient, private codeService: CodeService) {}
  test() {}
  ngAfterViewInit() {
    ace.require('ace/ext/language_tools');
    ace.config.set('basePath', 'ace-builds/src-noconflict');
    ace.config.set('modePath', 'ace-builds/src-noconflict');
    ace.config.set('themePath', 'ace-builds/src-noconflict');
    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions = this.getEditorOptions();
    this.editorBeautify = ace.require('ace/ext/beautify');
    this.codeEditor = ace.edit(element, editorOptions);
    this.codeEditor.setTheme(THEME);
    this.codeEditor.setKeyboardHandler(KEY);
    //this.codeEditor.session.setMode('ace/mode/javascript');
    this.changeLanguage('javascript');
    this.beautifyContent();
    this.codeEditor.setShowFoldWidgets(true); // for the scope fold feature
  }
  ngOnInit() {
    console.log(this.language);
    this.codeService.getCode().subscribe((res) => {
      const result = JSON.parse(JSON.stringify(res));
      console.log(result);

      this.enonce = result.subject;
      this.defaultTests = result.intputOutput;
      this.defaultSignature = result.defaultSignature;
      console.log(this.defaultSignature);

      this.changeLanguage('javascript');
    });
  }
  private getEditorOptions(): Partial<ace.Ace.EditorOptions> & {
    enableBasicAutocompletion?: boolean;
  } {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      minLines: 14,
      maxLines: Infinity,
    };

    const extraEditorOptions = {
      enableBasicAutocompletion: true,
    };
    const margedOptions = Object.assign(basicEditorOptions, extraEditorOptions);
    return margedOptions;
  }

  public beautifyContent() {
    if (this.codeEditor && this.editorBeautify) {
      const session = this.codeEditor.getSession();
      this.editorBeautify.beautify(session);
    }
  }
  getCode() {
    const code = this.codeEditor.getValue();
    console.log(code);
    return code;
  }
  changeLanguage(event) {
    this.language = event;
    this.codeEditor.session.setMode('ace/mode/' + event);
    if (this.language == 'java') {
      let tests = `//développez votre fonction ${this.defaultSignature} içi \n \n \n \n`;
      this.defaultTests.forEach((test) => {
        tests += `System.out.print(${this.defaultSignature.split('(')[0]}(${
          test.input
        }));  //résultat attendu : ${test.output}\n`;
      });
      this.codeEditor.setValue(
        `public class SpringTest { 
           public static void main(String[] args) throws Exception { 
              ${tests} 
            }
}`
      );
    } else if (this.language == 'javascript') {
      let tests = `//développez votre fonction ${this.defaultSignature} içi \n \n \n \n`;
      this.defaultTests.forEach((test) => {
        tests += `console.log(${this.defaultSignature.split('(')[0]}(${
          test.input
        })); //résultat attendu : ${test.output} \n`;
      });
      this.codeEditor.setValue(`${tests}`);
    }
    this.beautifyContent();
  }

  sendRequest() {
    this.codeService
      .testCode({ code: this.getCode(), language: this.language })
      .subscribe((res) => {
        console.log(JSON.parse(JSON.stringify(res)).output);
      });
  }
}
