import { FormUtilsService } from './../../../shared/form/form-utils.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatHint, MatError, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrl: './course-form.component.scss',
    standalone: true,
    imports: [MatCard, MatToolbar, MatCardContent, ReactiveFormsModule, MatFormField, MatInput, MatHint, MatError, MatLabel, MatSelect, MatOption, MatIconButton, MatIcon, MatPrefix, MatCardActions, MatButton]
})
export class CourseFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {

  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];

    if (course === undefined) {
      this.form = this.formBuilder.group({
        _id: [''],
        name: ['', [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)]],
        category: ['', [Validators.required] ],
        lessons: this.formBuilder.array([])
      });
    } else {
      this.form = this.formBuilder.group({
        _id: [course._id],
        name: [course.name, [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)]],
        category: [course.category, [Validators.required] ],
        lessons: this.formBuilder.array(this.retrieveLessons(course), Validators.required)
      });
    }

  }

  private retrieveLessons(course: Course) {
    const lessons = [];
      if (course?.lessons) {
        course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
      } else {
        lessons.push(this.createLesson());
      }

    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11)]]
    });
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {

      if (this.form.controls['name'] || this.form.controls['category'] === null) {
        this.showErrorMsg();
      }
      this.service.save(this.form.value).subscribe(
        () => {
          this.snackBar.open('Curso salvo com sucesso!', 'Ok', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      );
      this.onCancel();

    } else {
      this.formUtils.validateAllFormFields(this.form);
    }


  }

  onCancel() {
    this.location.back();
  }

  private showErrorMsg(): void {
    this.snackBar.open('Erro ao salvar curso.', 'Ok', {
      duration: 3000,
      verticalPosition: 'top'
    })
  }

}
