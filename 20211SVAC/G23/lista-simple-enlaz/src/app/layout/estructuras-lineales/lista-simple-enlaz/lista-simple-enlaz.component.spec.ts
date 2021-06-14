import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ListaSimpleEnlazComponent } from './lista-simple-enlaz.component';
import { ListaSimpleEnlazModule } from './lista-simple-enlaz.module';

describe('ListaSimpleEnlazComponent', () => {
  let component: ListaSimpleEnlazComponent;
  let fixture: ComponentFixture<ListaSimpleEnlazComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ ListaSimpleEnlazModule,BrowserAnimationsModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSimpleEnlazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
