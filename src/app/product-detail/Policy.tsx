const A_FEATURES = [
  {
    color: "bg-blue-50",
    name: "Delivery Partners",
    desc: "Pathao Courier, Steadfast, Sundarban Courier Service",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 14H13C14.1 14 15 13.1 15 12V2H6C4.5 2 3.19 2.83 2.51 4.05" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01C18.22 5.39 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 22C9.105 22 10 21.1 10 20C10 18.9 9.105 18 8 18C6.895 18 6 18.9 6 20C6 21.1 6.895 22 8 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 22C17.105 22 18 21.1 18 20C18 18.9 17.105 18 16 18C14.895 18 14 18.9 14 20C14 21.1 14.895 22 16 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    color: "bg-green-50",
    name: "Delivery Charges",
    desc: "Dhaka: ৳70-80 | Suburbs: ৳100-110 | Outside: ৳120-130",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 7H16C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7H6C4.9 7 4 7.9 4 9V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V9C20 7.9 19.1 7 18 7ZM12 5C13.1 5 14 5.9 14 7H10C10 5.9 10.9 5 12 5ZM18 20H6V9H18V20Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    color: "bg-amber-50",
    name: "Delivery Time",
    desc: "Dhaka: 24-48 hrs | Outside: 3-4 business days",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 6V12L16 14" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    color: "bg-purple-50",
    name: "Order Cut-off Time",
    desc: "3:00 PM daily cutoff • Same-day dispatch before 3PM",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.5 11H12V7.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
];

const Policy = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Intro Paragraph */}
      <p className="text-slate-600 dark:text-slate-300 text-center">
        At Artexo, we deliver promptly and securely across Bangladesh with hassle-free home delivery service.
      </p>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {A_FEATURES.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col p-5 rounded-2xl ${item.color} dark:bg-opacity-90`}
          >
            <div dangerouslySetInnerHTML={{ __html: item.svg }}></div>
            <div className="mt-2.5">
              <p className="font-semibold text-slate-900">{item.name}</p>
              <p className="text-slate-500 mt-0.5 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Home Delivery Section */}
      <div className="p-5 bg-slate-50 rounded-2xl dark:bg-slate-800">
        <h3 className="font-semibold text-lg mb-2">Home Delivery</h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          Available nationwide including remote areas. Note: Delivery times may vary due to weather or courier workload.
        </p>
      </div>

      {/* Final Note */}
      <div className="text-center text-slate-500 text-sm">
        For assistance, contact our customer service team.
      </div>
    </div>
  );
};

export default Policy;