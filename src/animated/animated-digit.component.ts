import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  ViewChild
} from "@angular/core";

@Component({
  selector: "animated-digit",
  templateUrl: "animated-digit.component.html",
  styleUrls: ["animated-digit.component.scss"]
})
export class AnimatedDigitComponent implements AfterViewInit {
  @Input() digit: any;
  @ViewChild("animatedDigit") animatedDigit: ElementRef | undefined;

  animateCount() {
    if (typeof this.digit === "number") {
      this.counterFunc(this.digit, this.animatedDigit);
    }
  }

  counterFunc(endValue: number, element: any) {
    const steps = 12;
    const durationMs = Math.floor((Math.random()*1000)+1000);

    const stepCount = Math.abs(durationMs / steps);
    const valueIncrement = (endValue - 0) / stepCount;
    const sinValueIncrement = Math.PI / stepCount;

    let currentValue = 0;
    let currentSinValue = 0;

    const step = () => {
      currentSinValue += sinValueIncrement;
      currentValue += valueIncrement * Math.sin(currentSinValue) ** 2 * 2;

      element.nativeElement.textContent = Math.abs(Math.floor(currentValue));
      if(Math.abs(Math.floor(currentValue)) === this.digit){
        element.nativeElement.textContent = "+" + element.nativeElement.textContent;
      }

      if (currentSinValue < Math.PI) {
        window.requestAnimationFrame(step);
      }
    }

    step();
  }

  ngAfterViewInit() {
    if (this.digit) {
      this.animateCount();
    }
  }
}
