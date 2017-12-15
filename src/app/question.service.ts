import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { Topic } from "./model/topic";

@Injectable()
export class QuestionService{

  questions:string [];
  constructor(private http:HttpClient) { }
  
  getQuestions(): Observable<Topic> {
    // Make the HTTP request:
    return this.http.get<Topic>('./assets/sampleTopicData.json');
    // this.http.get<Topic>('./assets/sampleTopicData.json').subscribe(data => {
    //   // Read the result field from the JSON response.
    //   this.questions = JSON.parse(data.text());
    //   this.questions = this.questions['concepts'];
    //   //console.log(this.questions);
    // });
    // return of(this.questions);
  }
  submitAnswers(answers:string[]):Observable<Object>{
    return this.http.post('http://localhost/onlineTest/saveResponse.php',answers);
  }

}
