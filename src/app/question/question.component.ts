import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { QuestionService } from "../question.service";
import { Topic } from '../model/topic';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],

})
export class QuestionComponent implements OnInit {
  currentIndex: number;
  currentConcept: number;
  currentQuestion: number;
  questionsCount: number;
  topic: Topic;
  selectedOption:string;
  answers:any[];

  constructor(private questionService: QuestionService) {
    this.currentIndex = 0;
    this.currentConcept = 0;
    this.currentQuestion = 0;
    this.questionsCount = 0;
    this.selectedOption = "";
    this.answers = [];
  }

  ngOnInit() {

    this.getQuestions();
  }

  getQuestions(): void {
    this.questionService.getQuestions().subscribe(
      topic => {
        this.topic = topic;
        topic.concepts.forEach(
          concept => {
            this.questionsCount += concept.questions.length;
          });
      }
    );
  }

  getNextQuestion(form:NgForm): void {
    let questionID = this.topic.concepts[this.currentConcept].questions[this.currentQuestion];
    let answer = this.selectedOption.toString();
    this.answers.push({ questionID: questionID,answer:answer});

    if (this.currentIndex + 1 != this.questionsCount) {
      this.currentIndex++;
      if (this.currentQuestion + 1 == this.topic.concepts[this.currentConcept].questions.length) {
        this.currentConcept++;
        this.currentQuestion = 0;
      }
      else {
        this.currentQuestion++;
      }
    }
    form.reset();
  }

  getPreviousQuestion(form: NgForm): void {
    let questionID = this.topic.concepts[this.currentConcept].questions[this.currentQuestion];
    let answer = this.selectedOption.toString();
    this.answers.push({ questionID: answer
    });
    if (this.currentIndex > 0) {
      this.currentIndex--;
      if (this.currentQuestion - 1 < 0) {
        this.currentConcept--;
        this.currentQuestion = this.topic.concepts[this.currentConcept].questions.length - 1;
      }
      else {
        this.currentQuestion--;
      }
    }
    form.reset();
  }
  submitAnswers():void{
    this.questionService.submitAnswers(this.answers);
  }
}
