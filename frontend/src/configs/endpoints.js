
// ${process.env.REACT_APP_SERVER_API_URL}
const prefix = '/api/v1';

export default {
  cndServer: process.env.REACT_APP_CDN_SERVER_URL,
  file: {
    upload: `${process.env.REACT_APP_CDN_SERVER_URL}${prefix}/file/upload`,
    uploadFiles: `${process.env.REACT_APP_CDN_SERVER_URL}${prefix}/file/upload-files`,
  },
  site: {
    DETAIL: `${prefix}/site/detail`,
    INIT_ORG: `${prefix}/site/init-org`,
    INIT_USER: `${prefix}/site/init-user`,
    INIT_DOMAIN: `${prefix}/site/init-domain`,
  },
  syllabus: {
    detail: `${prefix}/syllabus/detail`,
    find: `${prefix}/syllabus/find`,
    create: `${prefix}/syllabus/create`,
    upsertLecture: `${prefix}/syllabus/upsert-lecture`,
    updateLectureMaterials: `${prefix}/syllabus/update-lecture-materials`,
    createChapter: `${prefix}/syllabus/create-chapter`,
    delete: `${prefix}/syllabus/delete`,
    update: `${prefix}/syllabus/update`,
  },
  course: {
    detail: `${prefix}/course/detail`,
    create: `${prefix}/course/create`,
    updateLectureName: `${prefix}/course/update-lecture-name`,
    deleteLecture: `${prefix}/course/delete-lecture`,
    createChapter: `${prefix}/course/create-chapter`,
    find: `${prefix}/course/find`,
  },
  organization: {
    new: `${prefix}/organization/new`,
    search: `${prefix}/organization/search`,
    getOrg: `${prefix}/organization/get`,
  },
  node: {
    create: `${prefix}/node/create`,
    update: `${prefix}/node/update`,
    find: `${prefix}/node/find`,
    findByIids: `${prefix}/node/find-by-iids`,
    detail: `${prefix}/node/detail`,
  },
  user: {
    create: `${prefix}/user/create`,
    find: `${prefix}/user/find`,
    register: `${prefix}/user/register`,
    login: `${prefix}/user/login`,
    logout: `${prefix}/user/logout`,
    changePassword: (iid) => `${prefix}/user/${iid}/change-password`,
    detail: `${prefix}/user/detail`,
  },
  learningMaterial: {
    getByIids: `${prefix}/lecture-material/get-by-iids`,
  },
  twoFa: {
    generateTwoFa: `${prefix}/secret/generate`,
    generateQrCode: `${prefix}/secret/qr-code`,
    saveTwoFa: `${prefix}/secret/save`,
  },
  context: {
    publicContext: `${prefix}/system/context`,
  },
};
