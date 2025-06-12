export const dataColorFilter = {
  colors: {
    title: "رنگ",
    label: "colors",
    id: 121,
    filters: [
      { id: "color=blue&", name: "آبی" },
      { id: "color=green&", name: "سبز" },
      { id: "color=red&", name: "قرمز" },
      { id: "color=black&", name: "مشکی" },
      { id: "color=white&", name: "سفید" },
      { id: "color=yellow&", name: "زرد" },
      { id: "color=orange&", name: "نارنجی" },
      { id: "color=purple&", name: "بنفش" },
      { id: "color=pink&", name: "صورتی" },
      { id: "color=brown&", name: "قهوه‌ای" },
      { id: "color=gray&", name: "خاکستری" },
      { id: "color=beige&", name: "بژ" },
      { id: "color=navy&", name: "سرمه‌ای" },
    ],
  },
};

export const dataSizeFilter = {
  sizes: {
    title: "سایز",
    label: "sizes",
    id: 122,
    filters: [
      { id: "size=S&", name: "اِسمال" },
      { id: "size=M&", name: "مدیوم" },
      { id: "size=L&", name: "لارج" },
      { id: "size=XL&", name: "ایکس لارج" },
      { id: "size=XXL&", name: "دو ایکس لارج" },
      { id: "size=XXXL&", name: "سه ایکس لارج" },
    ],
  },
  sizeNumber: {
    title: "سایز",
    label: "sizes",
    id: 124,
    filters: [
      { id: "size=30&", name: "30" },
      { id: "size=31&", name: "31" },
      { id: "size=32&", name: "32" },
      { id: "size=33&", name: "33" },
      { id: "size=34&", name: "34" },
      { id: "size=35&", name: "35" },
      { id: "size=36&", name: "36" },
      { id: "size=37&", name: "37" },
      { id: "size=38&", name: "38" },
      { id: "size=39&", name: "39" },
      { id: "size=40&", name: "40" },
    ],
  },
};

export const dataSort = {
  title: "مرتب‌سازی براساس:",
  label: "sort",
  id: 123,
  filters: [
    { id: "sales&_order=desc", name: "پرفروش‌ترین" },
    { id: "rating&_order=desc", name: "محبوب‌ترین" },
    { id: "publishTimeSort&_order=desc", name: "جدیدترین" },
    { id: "price&_order=asc", name: "ارزان‌ترین" },
    { id: "price&_order=desc", name: "گران‌ترین" },
  ],
};
