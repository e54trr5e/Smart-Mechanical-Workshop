const services = [
            {
                name: "Engine Repair",
                para: "Complete engine diagnostics and repair service.",
                price: 5000
            },
            {
                name: "Brake Service",
                para: "Brake pad replacement and safety check.",
                price: 2000
            },
            {
                name: "Oil Change",
                para: "High quality engine oil replacement.",
                price: 1200
            },
            {
                name: "Wheel Alignment",
                para: "Precision wheel balancing and alignment.",
                price: 1500
            },
            {
                name: "AC Repair",
                para: "Car AC cooling system repair and gas refill.",
                price: 2500
            },
            {
                name: "Battery Replacement",
                para: "Battery testing and new battery installation.",
                price: 3500
            },
            {
                 name:"Car Wash", 
                 para:"Exterior and interior premium cleaning service.",
                 price:600
            },
            {
                 name:"Tyre Replacement", 
                 para:"Replace worn tyres with new ones.", 
                 price:4000
            },

        ];

        const container1 = document.getElementById("servicesContainer");
        const totalDisplay = document.getElementById("total");

        let total = 0;

        services.forEach((service, index) => {

            const card = document.createElement("div");
            card.className = "service-card";

            card.innerHTML = `
                <h3>${service.name}</h3>
                <p>${service.para}</p>
                <div class="price">₹ ${service.price}</div>

                <label class="select-box">
                    <input type="checkbox" data-price="${service.price}">
                    Select Service
                </label>
            `;

            container1.appendChild(card);
        });

        container1.addEventListener("change", (e) => {

            if (e.target.type === "checkbox") {
                const price = parseInt(e.target.dataset.price);

                if (e.target.checked) {
                    total += price;
                } else {
                    total -= price;
                }

                totalDisplay.textContent = total;
            }
        });

        const mechanics = [
{
    name:"Rahul Sharma",
    exp:8,
    specialization:"Engine",
    certified:true,
    photo:"https://randomuser.me/api/portraits/men/32.jpg"
},
{
    name:"Amit Verma",
    exp:5,
    specialization:"Brakes",
    certified:true,
    photo:"https://randomuser.me/api/portraits/men/45.jpg"
},
{
    name:"Karan Patel",
    exp:7,
    specialization:"AC",
    certified:false,
    photo:"https://randomuser.me/api/portraits/men/64.jpg"
},
{
    name:"Vikas Singh",
    exp:10,
    specialization:"Electrical",
    certified:true,
    photo:"https://randomuser.me/api/portraits/men/21.jpg"
},
{
    name:"Sanjay Mehta",
    exp:6,
    specialization:"Wheel Alignment",
    certified:true,
    photo:"https://randomuser.me/api/portraits/men/76.jpg"
},
{
    name:"Deepak Yadav",
    exp:4,
    specialization:"Battery",
    certified:false,
    photo:"https://randomuser.me/api/portraits/men/88.jpg"
},
{
    name:"Arjun Nair",
    exp:9,
    specialization:"Engine",
    certified:true,
    photo:"https://randomuser.me/api/portraits/men/19.jpg"
},
{
    name:"Rohit Kapoor",
    exp:3,
    specialization:"AC",
    certified:false,
    photo:"https://randomuser.me/api/portraits/men/55.jpg"
}
];

const container2 = document.getElementById("mechanicsContainer");
const filterButtons = document.getElementById("filterButtons");

function displayMechanics(list){
    container2.innerHTML = "";

    list.forEach(m => {
        const card = document.createElement("div");
        card.className = "mechanic-card";

        card.innerHTML = `
            <img src="${m.photo}">
            <h3>${m.name}</h3>
            <p><strong>Experience:</strong> ${m.exp} years</p>
            <p><strong>Specialization:</strong> ${m.specialization}</p>
            ${m.certified ? '<span class="badge">✔ Certified</span>' : ''}
        `;

        container2.appendChild(card);
    });
}

const specializations = ["All", ...new Set(mechanics.map(m => m.specialization))];

function setActive(btn){
    document.querySelectorAll(".filters button")
        .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

specializations.forEach((spec, index) => {

    const btn = document.createElement("button");
    btn.textContent = spec;

    // Default ACTIVE = All
    if(index === 0) btn.classList.add("active");

    btn.onclick = () => {
        setActive(btn);

        const filtered = spec === "All"
            ? mechanics
            : mechanics.filter(m => m.specialization === spec);

        displayMechanics(filtered);
    };

    filterButtons.appendChild(btn);
});

displayMechanics(mechanics);



const selectedServicesBox = document.getElementById("selectedServices");
const finalTotalDisplay = document.getElementById("finalTotal");
const serviceTypeSelect = document.getElementById("serviceType");

container1.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
        updateBookingSummary();
    }
});

function updateBookingSummary() {
    let selectedList = [];
    let checkboxes = container1.querySelectorAll("input[type='checkbox']:checked");

    checkboxes.forEach(cb => {
        const card = cb.closest(".service-card");
        const name = card.querySelector("h3").innerText;
        const price = cb.dataset.price;

        selectedList.push(`${name} - ₹${price}`);
    });

    selectedServicesBox.value = selectedList.join("\n");
    updateFinalTotal();
}


serviceTypeSelect.addEventListener("change", updateFinalTotal);

function updateFinalTotal() {
    let finalAmount = total;

    if (serviceTypeSelect.value === "Express") {
        finalAmount += 500;
    }

    finalTotalDisplay.innerText = finalAmount;
}


function confirmBooking() {
    const name = custName.value.trim();
    const email = custEmail.value.trim();
    const phone = custPhone.value.trim();
    const date = serviceDate.value;

    if (!name || !email || !phone || !date) {
        alert("Please fill all booking details");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Invalid Email Address");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Invalid Phone Number");
        return;
    }

    if (total === 0) {
        alert("Please select at least one service");
        return;
    }

    document.getElementById("successMsg").style.color = "lightgreen";
    document.getElementById("successMsg").innerText =
        "✅ Booking Confirmed Successfully!";
}

const queryType = document.getElementById("queryType");
const messageBox = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");

function validateContactForm(){
    if(queryType.value !== "" && messageBox.value.trim().length >= 10){
        sendBtn.disabled = false;
    } else {
        sendBtn.disabled = true;
    }
}

queryType.addEventListener("change", validateContactForm);
messageBox.addEventListener("input", validateContactForm);

sendBtn.addEventListener("click", () => {
    alert("✅ Message sent successfully!");
    queryType.value = "";
    messageBox.value = "";
    sendBtn.disabled = true;
});

document.querySelector(".hero-buttons .second")
    .addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(".service")
            .scrollIntoView({ behavior: "smooth" });
    });

document.querySelector(".hero-buttons .first")
    .addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(".booking")
            .scrollIntoView({ behavior: "smooth" });
    });

const navLinks = document.querySelectorAll(".nav-link ul li a");

const sections = {
    "Home": ".home",
    "Services": ".service",
    "Gallery": ".gallery",
    "Contact": ".contact",
    "Bookings": ".booking",
    "Mechanics": ".mechanic"

};

navLinks.forEach(link => {
    link.addEventListener("click", function (e) {

        const text = this.textContent.trim();

        if (sections[text]) {
            e.preventDefault();

            document.querySelector(sections[text])
                .scrollIntoView({ behavior: "smooth" });
        }
    });
});
