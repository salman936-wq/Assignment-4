// Jodi Button a click kore tahole event start hobe

// Lagbe 
// 
// If interview count > 0 === interview id(noJobs) display none
// Else if (Append) the interview activeded <div> in interviewtab
//
// 

// ==========================================
// STEP 1 → FAKE DATABASE / JOBS ARRAY
// ==========================================

// এই array টা পুরো project এর database হিসেবে কাজ করবে

// Backend নাই
// তাই array = database 😄

// প্রতিটা object মানে একটা job card

const jobs = [

  {
    id: 1,

    // company name
    companyName: "Google",

    // job title
    position: "Frontend Developer",

    // location
    location: "Remote",

    // job type
    type: "Full-time",

    // salary
    salary: "$90,000",

    // job description
    description: "Build modern frontend applications using React.",

    // job status
    // default এ সব all থাকবে
    status: "all"
  },



  {
    id: 2,
    companyName: "Microsoft",
    position: "Backend Developer",
    location: "USA",
    type: "Remote",
    salary: "$120,000",
    description: "Node.js backend developer needed.",
    status: "all"
  },



  {
    id: 3,
    companyName: "Tesla",
    position: "UI Designer",
    location: "Canada",
    type: "Full-time",
    salary: "$80,000",
    description: "Creative UI/UX designer needed.",
    status: "all"
  }

];



// ==========================================
// STEP 2 → DOM SELECT
// ==========================================

// HTML এর element গুলো JS এ ধরতেছি

// যাতে পরে manipulate করতে পারি



// All jobs container

const allContent = document.getElementById("tabs-all-content");



// Interview jobs container

const interviewContent = document.getElementById("tabs-interview-content");



// Rejected jobs container

const rejectedContent = document.getElementById("tabs-rejected-content");



// Dashboard total count

const totalCount = document.getElementById("total-count");



// Dashboard interview count

const interviewCount = document.getElementById("interview-count");



// Dashboard rejected count

const rejectedCount = document.getElementById("rejected-count");



// ==========================================
// STEP 3 → CREATE CARD FUNCTION
// ==========================================

// এই function এর কাজ:

// job object নিবে
// একটা HTML card return করবে



function createCard(job) {

  // template literal ব্যবহার করছি
  // যাতে dynamic data inject করা যায়

  return `

    <div class="p-6 flex flex-col bg-white shadow rounded-lg mt-4">

      <!-- top section -->

      <div class="flex justify-between items-center">

        <!-- company name -->

        <h1 class="text-[#002C5C] text-[18px] font-semibold">

          ${job.companyName}

        </h1>



        <!-- delete button -->

        <button
          class="delete-btn cursor-pointer"
          data-id="${job.id}"
        >

          <i class="fa-solid fa-trash-can text-[#64748B] "></i>

        </button>

      </div>



      <!-- position -->

      <p class="text-[14px] text-[#64748B] pt-1">

        ${job.position}

      </p>



      <!-- location + type + salary -->

      <p class="text-[16px] text-[#64748B] pt-5">

        ${job.location} • ${job.type} • ${job.salary}

      </p>



      <!-- status -->

      <div class="pt-5">

        <p class="
          py-2 px-3 w-[130px]
          uppercase text-center rounded

          ${job.status === "interview"
            ? "bg-green-100 text-green-700"
            : ""}

          ${job.status === "rejected"
            ? "bg-red-100 text-red-700"
            : ""}

          ${job.status === "all"
            ? "bg-blue-100 text-blue-700"
            : ""}
        ">

          ${job.status}

        </p>

      </div>



      <!-- description -->

      <p class="text-[#323B49] text-[14px] pt-2">

        ${job.description}

      </p>



      <!-- buttons -->

      <div class="gap-2 flex pt-5">

        <!-- interview button -->

        <button

          class="interview-btn btn btn-outline btn-success uppercase"

          data-id="${job.id}"

        >

          Interview

        </button>



        <!-- rejected button -->

        <button

          class="rejected-btn btn btn-outline btn-error uppercase"

          data-id="${job.id}"

        >

          Rejected

        </button>

      </div>

    </div>

  `;

}



// ==========================================
// STEP 4 → EMPTY STATE FUNCTION
// ==========================================

// Interview বা Rejected tab এ
// কোন data না থাকলে এই UI show হবে



function emptyState() {

  return `

    <div class="
      flex flex-col
      justify-center
      items-center
      min-h-[250px]
      bg-white
      rounded-lg
      mt-4
    ">

      <img
        src="jobs.png"
        class="w-[120px]"
      />



      <h2 class="
        pt-5
        text-[24px]
        font-semibold
        text-[#002C5C]
      ">

        No jobs available

      </h2>



      <p class="pt-1 text-[#64748B]">

        Check back soon for new job opportunities

      </p>

    </div>

  `;

}



// ==========================================
// STEP 5 → MAIN RENDER FUNCTION
// ==========================================

// পুরো project এর সবচেয়ে important function 😄

// কাজ:

// array → loop → HTML → DOM



function renderJobs() {



  // ======================================
  // STEP 5.1 → প্রথমে সব clear
  // ======================================

  // না করলে বারবার data add হবে

  allContent.innerHTML = "";

  interviewContent.innerHTML = "";

  rejectedContent.innerHTML = "";



  // ======================================
  // STEP 5.2 → FILTER DATA
  // ======================================

  // interview jobs বের করতেছি

  const interviewJobs = jobs.filter(

    job => job.status === "interview"

  );



  // rejected jobs বের করতেছি

  const rejectedJobs = jobs.filter(

    job => job.status === "rejected"

  );



  // ======================================
  // STEP 5.3 → ALL JOBS RENDER
  // ======================================

  jobs.forEach(job => {

    // createCard(job)
    // card HTML return করবে

    allContent.innerHTML += createCard(job);

  });



  // ======================================
  // STEP 5.4 → INTERVIEW RENDER
  // ======================================

  // যদি interview jobs না থাকে

  if (interviewJobs.length === 0) {

    // empty state show

    interviewContent.innerHTML = emptyState();

  }

  else {

    // data থাকলে card show

    interviewJobs.forEach(job => {

      interviewContent.innerHTML += createCard(job);

    });

  }



  // ======================================
  // STEP 5.5 → REJECTED RENDER
  // ======================================

  if (rejectedJobs.length === 0) {

    rejectedContent.innerHTML = emptyState();

  }

  else {

    rejectedJobs.forEach(job => {

      rejectedContent.innerHTML += createCard(job);

    });

  }

}



// ==========================================
// STEP 6 → DASHBOARD COUNT UPDATE
// ==========================================

// dashboard এর number update করবে



function updateCounts() {



  // total jobs count

  totalCount.innerText = jobs.length;



  // interview jobs বের করতেছি

  const interviewJobs = jobs.filter(

    job => job.status === "interview"

  );



  // rejected jobs বের করতেছি

  const rejectedJobs = jobs.filter(

    job => job.status === "rejected"

  );



  // dashboard এ বসাইতেছি

  interviewCount.innerText = interviewJobs.length;

  rejectedCount.innerText = rejectedJobs.length;

}



// ==========================================
// STEP 7 → MASTER UI FUNCTION
// ==========================================

// এই function পুরো UI control করবে

// whenever data changes:

// 1. render
// 2. update count



function updateUI() {

  renderJobs();

  updateCounts();

}



// ==========================================
// STEP 8 → EVENT DELEGATION
// ==========================================

// dynamically create করা button এর জন্য
// event delegation best 😄



document.body.addEventListener("click", function (e) {



  // ======================================
  // STEP 8.1 → INTERVIEW BUTTON
  // ======================================

  if (

    e.target.classList.contains("interview-btn")

  ) {



    // কোন button click হয়েছে তার id নিচ্ছি

    const id = Number(

      e.target.dataset.id

    );



    // specific job খুঁজতেছি

    const foundJob = jobs.find(

      job => job.id === id

    );



    // status change

    foundJob.status = "interview";



    // UI update

    updateUI();

  }





  // ======================================
  // STEP 8.2 → REJECTED BUTTON
  // ======================================

  if (

    e.target.classList.contains("rejected-btn")

  ) {



    const id = Number(

      e.target.dataset.id

    );



    const foundJob = jobs.find(

      job => job.id === id

    );



    foundJob.status = "rejected";



    updateUI();

  }





  // ======================================
  // STEP 8.3 → DELETE BUTTON
  // ======================================

  // closest ব্যবহার করছি
  // কারণ icon এ click হতে পারে

  if (

    e.target.closest(".delete-btn")

  ) {



    // button ধরতেছি

    const button = e.target.closest(

      ".delete-btn"

    );



    // button এর data-id নিচ্ছি

    const id = Number(

      button.dataset.id

    );



    // index বের করতেছি

    const index = jobs.findIndex(

      job => job.id === id

    );



    // array থেকে remove

    jobs.splice(index, 1);



    // UI update

    updateUI();

  }

});



// ==========================================
// STEP 9 → FIRST LOAD
// ==========================================

// page load হলেই
// প্রথম render হবে



updateUI();