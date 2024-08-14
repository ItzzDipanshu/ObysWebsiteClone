function locomotiveAnimation(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

function loadingAnimation(){
    var h5Timer = document.querySelector("#line1-part1 h4");

var tl = gsap.timeline();

tl.from(".line h1", {
  y: 150,
  stagger: 0.1,
  duration: 0.6,
  delay: 0.5,
});

tl.from("#line1-part1", {
  opacity: 0,
  onStart: function () {
    var counter = 0;
    setInterval(function () {
      if (counter < 100) {
        counter++;
        h5Timer.innerHTML = counter;
      } else {
        h5Timer.innerHTML = counter;
      }
    }, 30);
  },
});

tl.to(".line h2", {
    animationName: "anime",
    opacity:1,

})

tl.to("#loader", {
  opacity: 0,
  duration: 0.2,
  delay: 3.5,
});

tl.from("#page1",{
    y: 1200,
    opacity: 0,
    delay: 0.2,
    ease:Power4,
    duration: 0.6
})
tl.from("#page1Line1, #page2",{
  opacity: 0
}, "-=1") // "-=1" se humne is timeline ko iske execution time se pehle hi chala dia. 

tl.to("#loader",{
    display: "none"
})

tl.from("#nav",{
  opacity:0

})
tl.from("#page1Line1 h1, #page1Line2 h1, #page1Line3 h2, #page1Line4 h1",{
  y: 120,
  stagger:0.2

})


}

function cursorAnimation(){
  // document.addEventListener("mousemove", function(dets){
  //   gsap.to("#crsr",{
  //     left: dets.x,
  //     top: dets.y,
  //   })
  // })

  //Cursor using Shery

  Shery.mouseFollower({
    skew:true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,

  });
  
  Shery.makeMagnet("#nav-part2 h4" /* Element to target.*/, {
    //Parameters are optional.
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });

  var videoContainer = document.querySelector("#video-container");

  var video = document.querySelector("#video-container video");
  


  videoContainer.addEventListener("mouseenter", function() {
    videoContainer.addEventListener("mousemove",
      function(dets){
        gsap.to(".mousefollower",{
          opacity: 0,
        })
        gsap.to("#video-container-crsr",{
          left: dets.x - 530,
          top: dets.y - 290,
        })
      }
    )
  })
  videoContainer.addEventListener("mouseleave",function(){
    gsap.to(".mousefollower",{
      opacity: 1,
    })
    gsap.to("#video-container-crsr",{
      top: "-15%",
      left: "70%"
    })
  })


  var flag = 0;
  videoContainer.addEventListener("click", function(){
    if(flag == 0){
      video.play();
    video.style.opacity = 1;

    document.querySelector("#video-container-crsr").innerHTML = `<i class="ri-pause-fill"></i>`

    gsap.to("#video-container-crsr",{
      scale: 0.5,
    })
    flag = 1;
    }
    else{
      video.pause();
      video.style.opacity = 0;
      document.querySelector("#video-container-crsr").innerHTML = `<i class="ri-play-fill"></i>`

    gsap.to("#video-container-crsr",{
      scale: 1,
    })
    flag = 0;
    }
  })
}

function sheryAnimation() {
  Shery.imageEffect(".image-div",{
    style: 5,
    // debug:true,
    config: {"a":{"value":0.69,"range":[0,30]},"b":{"value":0.82,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272749932567818},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.52,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.69,"range":[0,10]},"metaball":{"value":0.53,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.37,"range":[0,2]},"noise_scale":{"value":9.92,"range":[0,100]}},
    gooey:true
    })
}

// Using Textillate JS liberary but failed to load that
// function footerAnimationn(){
// // Select the H1 element
// var footerH1 = document.querySelector("#letsCreate");

// // Initialize Textillate once, with autoStart false
// $('#letsCreate').textillate({
//   in: { effect: 'fadeOut', delayScale: 0.1 },
//   out: { effect: 'fadeIn', delayScale: 0.1 },
//   autoStart: false, // Prevents it from starting automatically
// });

// // Set the element to be visible initially
// footerH1.style.opacity = 1; // Ensure it is visible

// // Mouse enter event
// footerH1.addEventListener("mouseenter", function(){
//   gsap.to("#letsCreate", {
//     onStart: function() {
//       $('#letsCreate').textillate('in'); // Trigger the fadeIn effect
//     }
//   });
// });

// // Mouse leave event
// footerH1.addEventListener("mouseleave", function(){
//   gsap.to("#letsCreate", {
//     onStart: function() {
//       $('#letsCreate').textillate('out'); // Trigger the fadeOut effect
//     }
//   });
// });
// }

// FontAnimation mai ek sath 2 h1 rakho wali approach jisme hum kya krr sakte hai na ki 1 ki opacity 0 rakhe aur jab effect run ho to unki opacity alternate 0 1 krte rahe.


// alternative Approach - 
function footerAnimation() {
  var clutter1 = "";
  var clutter2 = "";

  document.querySelector("#footerHeading h1").textContent.split("").forEach(elem=>{
    clutter1 += `<span>${elem}</span>`
  })
  document.querySelector("#footerHeading h1").innerHTML = clutter1;

  document.querySelector("#footerHeading h2").textContent.split("").forEach(elem=>{
    clutter2 += `<span>${elem}</span>`
  })
  document.querySelector("#footerHeading h2").innerHTML = clutter2;

  document.querySelector("#footerHeading").addEventListener("mouseenter", function(){
    gsap.to("#footerHeading h1 span",{
      opacity: 0,
      stagger: 0.03,
    })
    gsap.to("#footerHeading h2 span",{
      delay: 0.3,
      opacity: 1,
      stagger: 0.03,
    })
  })

  document.querySelector("#footerHeading").addEventListener("mouseleave", function(){
    gsap.to("#footerHeading h1 span",{
      opacity: 1,
      stagger: 0.03,
    })
    gsap.to("#footerHeading h2 span",{
      delay: 0.3,
      opacity: 0,
      stagger: 0.03,
    })
  })

}

function page4Animation(){
  var clutter = "";
  document.querySelector("#page4-content>p").textContent.split("").forEach(elem=>{
    clutter += `<span style="color: #151515;">${elem}</span>`
  })

  document.querySelector("#page4-content>p").innerHTML = clutter;

  gsap.to("#page4-content>p span",{
    color: "#fff",
    stagger: 0.1,
    scrollTrigger: {
      trigger: "#page4-content>p",
      scroller: "body",
      // markers: true,
      start: "top 85%",
      end: "top 20%",
      scrub: 2,
      onUpdate: (self)=>{
        console.log(self.progress);
      }
    }
  })
}

locomotiveAnimation();
cursorAnimation();
loadingAnimation();
sheryAnimation();
footerAnimation();
page4Animation();