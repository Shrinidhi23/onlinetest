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
  currentIndex: number=0;
  currentConcept: number=0;
  currentQuestion: number=0;
  questionsCount: number=0;
  topic: Topic;
  selectedOption:string="";
  answers:any[]=[];
  submit_response:string ="";

  constructor(private questionService: QuestionService) {
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

  getNextQuestion(): void {
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
   
  }

  getPreviousQuestion(): void {
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
    
  }
  submitAnswers():void{
    this.questionService.submitAnswers(this.answers).subscribe( data => console.log(data));
    this.submit_response = "Successfully submitted";
  }
}
