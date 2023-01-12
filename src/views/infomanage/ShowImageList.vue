<template>
  <div style="width:100%;min-height: calc(100vh - 84px);background-color:#EEEEEE">
    <el-container style="padding:20px;border: 1px solid #eee" v-loading="loading" :element-loading-text="loadingText"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-aside width="20%" class="mokuai card shadow" style="min-height: calc(100vh - 180px)">
        <el-tree ref="tree" :data="routesData" :props="defaultProps" node-key="treeId" default-expand-all
          highlight-current :current-node-key="1" @node-click="rowClick" class="permission-tree" />
      </el-aside>
      <!-- //右边的盒子 -->
      <el-main width="78%" style="padding:0" class="right-box">        <!-- 操作部分 -->
        <div style="width:100%;">
          <el-button type="primary" class="filter-item" style="margin: 10px;" @click.prevent="addChildNode"
            v-hasPermi="['system:node:add']">
            添加子节点</el-button>
          <el-button type="danger" class="filter-item" style="margin: 10px;" @click.prevent="deleteNode"
            v-hasPermi="['system:node:remove']">删除节点</el-button>
          <el-button type="info" class="filter-item" style="margin: 10px;" @click.prevent="updateChildNode"
            v-hasPermi="['system:node:update']">修改节点</el-button>
          <el-button type="primary" class="filter-item" style="margin: 10px;" @click.prevent="addImage"
            v-hasPermi="['system:image:add']">添加图片</el-button>
        </div>
        <!-- 内容部分 -->
        <div v-if="imageSrcList.length === 0" style="height:500px;">无图片或未选择节点</div>
        <div class="image_box img-list" v-else>
          <el-card class="image_item item" v-for="(item, index) in imageSrcList" :key="item.pictureId">
            <div class="wrapper">
              <div class="imgBox">
                <el-image :src="getImageUrlByUrl(item.lessPictureUrl)"
                  :preview-src-list="imageSrcList.map(item => getImageUrlByUrl(item.pictureUrl))" ref="previewImg" :initial-index="index"
                  style="min-width: 168px;height:168px;text-align: center;line-height: 168px;font-size: 40px;"
                  fit="fill" lazy>
                  <template #placeholder>
                    <div class="image-slot">Loading<span class="dot">...</span></div>
                  </template>
                  <template #error>
                    <el-icon>
                      <Picture />
                    </el-icon>
                  </template>
                </el-image>
              </div>
            </div>
            <el-button class="delete_button" icon="Delete" size="large" circle type="danger" @click="deleteImage(index)"
              v-hasPermi="['system:image:remove']"></el-button>
            <!--<el-button type="primary" @click="showImg">查看原图</el-button>
            <el-image-viewer
              v-if="showImageViewer"
              @close="close"
              :url-list="imageSrcList.map(item => getImageUrlByUrl(item.pictureUrl))"
            />-->
          </el-card>
        </div>
      </el-main>
    </el-container>
    <el-dialog :title="textMap[dialogStatus]" v-model="dialogFormVisible" center draggable width="50%">
      <el-form ref="dataForm" :model="form" :rules="rules" label-position="left" label-width="100px">
        <el-form-item label="节点名称：" prop="treeName">
          <el-input v-model="form.treeName" placeholder="输入节点名称" />
        </el-form-item>
        <el-form-item label="是否公开：" prop="isShow">
          <el-switch v-model="form.isShow" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click.passive="dialogStatus === 'create' ? createData() : updateData()">
            保存
          </el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 添加图片对话框 -->
    <el-dialog title="添加图片" v-model="imageDialog" center draggable width="50%">
      <el-upload v-model:file-list="fileList" class="upload-demo" ref="upload" accept=".jpeg,.jpg,.png,.gif,.bmp,.webp"
        list-type="picture-card" :action="uploadUrl" :auto-upload="false"
        :headers="{ 'Authorization': 'Bearer ' + getToken() }" :on-error="uploadImageError"
        :on-success="uploadImageSuccess" :multiple="true">
        <el-button type="primary">Click to upload</el-button>
        <!--
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      -->
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitImage">
          添加
        </el-button>
        <el-button @click="imageDialog = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup name="showImageList">
import { ref, getCurrentInstance, nextTick } from 'vue';
import { getTreeNodeIdsByNode, getImageUrlByUrl } from '@/utils/tree';
import { getTree, addNode, updateNode, deleteNodes } from '@/api/tree.js';
import { getToken } from '@/utils/auth';
import { getImagesBynodeId, deleteImageByIdAndUrl } from '@/api/infomanage/types';

const props = defineProps({
  treeType: {
    type: Number,
    default: 1
  }
});

// vue实例
const { proxy: { $modal } } = getCurrentInstance();

// 加载
const loading = ref(false);
const loadingText = ref('加载中...');

// 图片
const imageSrcList = ref([]);


const imageList = [
  {
    pictureId: 1,
    pictureUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  },
  {
    pictureId: 2,
    pictureUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  },
  {
    pictureId: 3,
    pictureUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  },
  {
    pictureId: 4,
    pictureUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  },
  {
    pictureId: 5,
    pictureUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  },
  {
    pictureId: 6,
    pictureUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  }];

function deleteImage(index) {
  $modal.confirm('是否删除该图片?').then(() => {
    const image = imageSrcList.value[index];
    imageSrcList.value.splice(index, 1);
    deleteImageByIdAndUrl(image.pictureId, image.pictureUrl).then(() => {
      $modal.msgSuccess('删除图片成功');
    }, () => {
      $modal.msgError('删除图片失败');
    });
  });
}

// 打开添加图片对话框
function addImage(imageUrl) {
  imageDialog.value = true;
}

// 添加图片对话框
const imageDialog = ref(false);

const fileList = ref([]);

// 提交添加图片
const upload = ref(null);
const uploadUrl = ref('');

const submitImage = () => {
  imageDialog.value = false;
  uploadUrl.value = `${import.meta.env.VITE_APP_UPLOAD_URL}/system/picture/upload?isShow=1&treeId=${tree.value.getCurrentNode().treeId}`;
  nextTick(async () => {
    await upload.value.submit();
  });
  addImage();
};

async function uploadImageSuccess() {
  $modal.msgSuccess('添加图片成功');
  fileList.value = [];
  const curNode = tree.value.getCurrentNode();
  imageSrcList.value = await getImagesBynodeId(curNode.treeId);
  rowClick(curNode);
}

function uploadImageError() {
  $modal.msgError('添加图片失败');
}

//查看大图
/*
const previewImg = ref(null);
const viewBigPicture = () =>{
  console.log(previewImg.value);
  previewImg.value.clickHandler()
}*/

const previewImg = ref(null);
const viewBigPicture = () =>{
  previewImg.value.clickHandler();
}

const showImageViewer = ref(false);
const url = ref([]);
const showImg= () => { //预览大图
  showImageViewer.value = true
}
const close = () => { //必须要这个事件 不然点击右上角关闭按钮没有反应
  showImageViewer.value = false
}


// 对话框
const dialogFormVisible = ref(false);
const dialogStatus = ref('create');
const textMap = {
  create: '添加节点',
  update: '修改节点',
};

const form = reactive({
  treeName: '',
  isShow: true
});

// 重置表单
function resetForm() {
  form.treeName = '';
  form.isShow = true;
}

// 对话框表单
const dataForm = ref(null);

const rules = reactive({
  treeName: [
    { required: true, message: '请输入结点名称', trigger: 'blur' }
  ],
  isShow: [
    { required: true, message: '请选择', trigger: 'blur' }
  ]
});

function createData() {
  dataForm.value.validate(valid => {
    if (valid) {
      const id = tree.value.getCurrentNode() ? tree.value.getCurrentNode().treeId : 0;
      addNode({ isShow: form.isShow ? 1 : 0, treeName: form.treeName, parentId: id, treeType: props.treeType }).then(() => {
        $modal.msgSuccess('添加节点成功');
        getTreeList();
      }, () => {
        $modal.msgError('添加节点失败');
      });
      dialogFormVisible.value = false;
    }
  });
}

function updateData() {
  dataForm.value.validate(valid => {
    if (valid) {
      updateNode({ isShow: form.isShow ? 1 : 0, treeName: form.treeName, treeId: tree.value.getCurrentNode().treeId }).then(() => {
        $modal.msgSuccess('修改成功');
        getTreeList();
      }, () => {
        $modal.msgError('修改失败');
      });
      dialogFormVisible.value = false;
    }
  });
}

// 树控件
const routesData = ref([]);

const getTreeList = () => {
  getTree(props.treeType, 0, 1).then(res => {
    routesData.value = res.data.children;
    nextTick(() => {
      if (!tree.value.getCurrentNode())
        tree.value.setCurrentKey(routesData.value[0]?.treeId);
      rowClick(tree.value.getCurrentNode());
    });
  });
};

// 获取树
getTreeList();

const defaultProps = ref({
  children: 'children',
  label: 'treeName'
});

const tree = ref(null);
// 添加节点
function addChildNode() {
  if (!tree.value.getCurrentNode() && routesData.value.length !== 0) {
    $modal.msgWarning('请选择所要添加节点的父节点');
    return;
  }
  resetForm();
  dialogStatus.value = 'create';
  dialogFormVisible.value = true;
}
// 修改节点
function updateChildNode() {
  if (!tree.value.getCurrentNode()) {
    $modal.msgWarning('请选择所要修改节点的父节点');
    return;
  }
  resetForm();
  dialogStatus.value = 'update';
  dialogFormVisible.value = true;
}

//删除节点
function deleteNode() {
  if (!tree.value.getCurrentNode()) {
    $modal.msgWarning('请选择节点');
    return;
  }
  $modal.confirm('是否删除该节点?').then(() => {
    const curNode = tree.value.getCurrentNode();
    const curNodeTreeIds = getTreeNodeIdsByNode(curNode);
    deleteNodes(curNodeTreeIds).then(() => {
      $modal.msgSuccess('删除节点成功');
      getTreeList();
    });
  });
}
// 点击树节点时的回调
async function rowClick(nodeObj) {
  loading.value = true;
  imageSrcList.value = await getImagesBynodeId(nodeObj.treeId);
  if(imageSrcList.length === 0){
    $modal.msgWarning('此节点无图片');
  }
  console.log(imageSrcList.value,'888');
  loading.value = false;
}

</script>

<style scoped>
:deep(.el-tree-node__label) {
    font-size: 16px;
    
}

:deep(.el-tree) {
    background-color: rgb(218,227,241);
}

:deep(.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content) {
    background-color: #fff !important;
}

.card {
  background-color: #fff;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}

.u-main .el-tag+.el-tag {
  margin-left: 10px;
}

.u-main .button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.u-main .input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.u-main .el-form-item {
  margin: 60px 0;
}

.u-main .el-form-item__label {
  font-size: 20px;
}
</style>
<style lang="scss" scoped>
.image_box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  max-height: calc(100vh - 180px);
  justify-content: flex-start;
}

.image_item {
  box-sizing: border-box;
  margin: 10px 5px;
  width: 23%;
  min-width: 200px;
  min-height: 168px;
}

// .img-list {
//   /* background-color: pink; */
//   padding-left: 1%;
//   /* padding-right: 1%; */
//   display: flex;
//   justify-content: left;
//   flex-wrap: wrap;
//   /* min-width: 800px; */
//   width: 100%;
//   position: relative;
//   right: 0;
//   max-height: calc(100vh - 180px)
// }

// .img-list .item {
//   width: 20.8%;
//   /* background-color: skyblue; */
//   min-width: 168px;
//   min-height: 168px;
//   border: none;
//   outline: none;
//   cursor: pointer;
//   margin: 25px 1.3%;
// }

// .img-list .item .wrapper {
//   position: relative;
//   width: 100%;
//   padding-bottom: 75%;
//   overflow: hidden;
//   -webkit-border-radius: 2px;
//   -moz-border-radius: 2px;
//   border-radius: 2px;
//   /* -moz-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);
//   -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);
//   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33); */
// }

// .img-list .item .wrapper .imgBox {
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
// }


// .image_slot {
//   width: 100%;
// }

.right-box {
  // background-color: #fff;
  // border:1px solid #ccc;
  // margin-bottom: 50px;
  margin-left: 20px;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #f5f5f5;
}

.bg-purple-light {
  background: rgb(32, 177, 159);
}

.grid-content {
  border-radius: 0px;
  height: 50px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.upload {
  width: 100%;
  // border:1px solid #ccc;
}

.mokuai {
  margin-bottom: 0;
  background-color: rgb(218,227,241);
  // box-shadow:2px 2px 5px #000;
  // border:1px solid #ccc;
  // margin-bottom: 50px;
}

.right-box {
  // background-color: #fff;
  // border:1px solid #ccc;
  // margin-bottom: 50px;
  margin-left: 20px;
}

.u-title {
  width: 98%;
  margin: 0 auto;
  height: 50px;
}

.u-title ul {
  display: flex;
}

.u-title ul li {
  flex: 1;
  text-align: center;
}

.app-container {
  .roles-table {
    margin-top: 30px;
  }

  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
<style  scoped>
.shadow {
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14);
  /* 0 3px 3px -2px rgba(0, 0, 0, 0.12),
         0 1px 8px 0 rgba(0, 0, 0, 0.2); */
}
</style>
