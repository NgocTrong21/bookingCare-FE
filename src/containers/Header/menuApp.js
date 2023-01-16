export const adminMenu = [
  {
    //hệ thống
    name: "menu.admin.user",
    menus: [
      {
        name: "menu.system.system-administrator.user-manage",
        link: "/system/user-manage",
      },
      {
        name: "menu.system.system-administrator.user-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.system.system-administrator.user-function-component",
        link: "/system/user-function-component",
      },
      {
        name: "menu.system.system-administrator.doctor-manage",
        link: "/system/doctor-manage",
      },
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    //quản lý phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.clinic.clinic-manage",
        link: "/system/clinic-manage",
      },
    ],
  },
  {
    //quản lý chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.specialty.specialty-manage",
        link: "/system/specialty-manage",
      },
    ],
  },
  {
    //cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.system.system-administrator.user-manage",
        link: "/system/user-manage",
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.admin.user",
    menus: [
      //quản lý lịch khám
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      //quản lý bệnh nhân
      {
        name: "menu.patient.manage-patient",
        link: "/doctor/manage-patient",
      },
    ],
  },
];
