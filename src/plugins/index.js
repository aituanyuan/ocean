import Vue from 'vue';
import vueParticles from 'vue-particles';

// 引入样式
import 'vue-easytable/libs/themes-base/index.css';
import infiniteScroll from 'vue-infinite-scroll';
Vue.use(infiniteScroll);


import VModal from 'vue-js-modal';
Vue.use(VModal, { dialog: true, dynamic: true });

Vue.use(vueParticles);

import {
    Upload,
    Progress,
    Pagination,
    Divider,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Button,
    Select,
    Option,
    OptionGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DatePicker,
    ButtonGroup,
    Form,
    FormItem,
    Input,
    InputNumber,
    Loading,
    Menu,
    Submenu,
    MenuItem,
    Card,
    Tooltip,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Transfer,
    Avatar,
    Dialog,
    Table,
    TableColumn
} from 'element-ui';

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Avatar);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Pagination);
Vue.use(Divider);
Vue.use(DatePicker);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Loading.directive);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Card);
Vue.use(Tooltip);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Transfer);
Vue.use(Transfer);
Vue.prototype.$loading = Loading.service;

