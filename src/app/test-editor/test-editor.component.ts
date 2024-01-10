import { AfterViewInit, Component, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import tinymce from 'tinymce';

const TinyEditorInitDelay = 500;

@Component({
  selector: 'app-html-editor',
  templateUrl: './test-editor.component.html',
  styleUrls: ['./test-editor.component.scss']
})
export class TestEditorComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  private _reorderSubscription = new Subscription();
  reordering = true;
  tinyEditor: any;
  tinyElementId: string = '1';

  @Input() toolbarButtons = [];
  @Input() message = '';
  @Input() elementId: string = '1';
  @Input() height = 600;

  @Output() htmlChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private ngZone: NgZone) {}

  setupTinyEditor() {
    tinymce.init({
      base_url: '/tinymce',
      menubar: false,
      statusbar: false,
      branding: false,
      height: this.height,
      selector: '#' + this.tinyElementId,
      toolbar:
        'undo redo | formatselect | bold italic underline strikethrough | fontselect fontsizeselect | alignleft aligncenter alignright | numlist bullist checklist |' +
        ' numlist bulletlist | link image | code nameButton presidentButton',
      plugins: ['advlist autolink lists image preview anchor', 'searchreplace media paste code'],
      content_style: '@import url("https://fonts.googleapis.com/css2?family=Aguafina+Script");',
      font_formats: `Aguafina=Aguafina Script;Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif;
         Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif;
         Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago;
         Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco;
         Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva;
         Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats`,
      setup: (editor) => {
        this.toolbarButtons.length &&
        this.toolbarButtons.forEach((token: any) => {
          editor.ui.registry.addButton(token.name, {
            text: token.text,
            tooltip: token.tooltip,
            onAction() {
              editor.insertContent(token.text);
            }
          });
        });
        editor.on('init', (e) => {
          this.ngZone.run(() => {
            this.tinyEditor.setContent(this.message);
            this.reordering = false;
          });
        });
        editor.on('blur', (change) => {
          this.ngZone.run(() => {
            this.checkHTMLForChange();
          });
        });
        this.tinyEditor = editor;
      }
    });
  }

  checkHTMLForChange() {
    if (this.tinyEditor.isDirty) {
      this.message = this.tinyEditor.getContent();
      this.htmlChange.emit(this.message);
    }
  }

  handleQuestionReorder(hide: boolean) {
    if (hide) {
      this.reordering = true;
      tinymce.get(this.tinyElementId)?.remove();
    } else {
      setTimeout(() => {
        this.setupTinyEditor();
        this.reordering = false;
      }, TinyEditorInitDelay);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!this.tinyEditor && changes.hasOwnProperty('message')) {
      this.tinyEditor.setContent(this.message);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setupTinyEditor();
    }, TinyEditorInitDelay);
  }

  ngOnInit(): void {
    this.tinyElementId = `tiny-textarea-${this.elementId}`;
  }

  ngOnDestroy() {
    if (tinymce.activeEditor) {
      tinymce.activeEditor.remove();
    }
    if (!!this._reorderSubscription) {
      this._reorderSubscription.unsubscribe();
    }
  }
}
