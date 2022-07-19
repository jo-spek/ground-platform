/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SurveyService } from '../../services/survey/survey.service';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-title-dialog',
  templateUrl: './title-dialog.component.html',
  styleUrls: ['./title-dialog.component.css'],
})
export class TitleDialogComponent {
  surveyTitleForm: FormGroup;

  constructor(
    private readonly matDialogRef: MatDialogRef<TitleDialogComponent>,
    private navigationService: NavigationService,
    private surveyService: SurveyService
  ) {
    this.surveyTitleForm = new FormGroup({ title: new FormControl() });
  }

  async onCreateSurvey() {
    try {
      const surveyId = await this.surveyService.createSurvey(
        this.surveyTitleForm.get('title')?.value
      );
      this.navigationService.selectSurvey(surveyId);
      this.matDialogRef.close();
    } catch (e) {
      console.warn('Survey creation failed', e);
    }
  }
}
