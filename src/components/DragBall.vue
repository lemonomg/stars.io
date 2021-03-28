<template>
  <div
    class="drag-ball"
    ref="dragBall"
    @touchstart.stop.prevent="touchstart"
    @touchmove.stop.prevent="touchmove"
    @touchstop.stop.prevent="touchstop"
  >
    <div class="drag-content">
      <slot name="value">
        <svg-icon :icon-class="isRouteMy ? 'login' : 'edit'" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

Component.registerHooks(["beforeRouteUpdate"]);
@Component({ name: "drag-ball" })
export default class DragBall extends Vue {
  @Watch("$route")
  onRouteChanged(val: any) {
    if (val.path == "/my") {
      this.isRouteMy = true;
    } else {
      this.isRouteMy = false;
    }
  }
  public isRouteMy = false;

  public canDrag = false;
  // 偏移
  public inset = { left: 0, top: 0 } as any;
  // 移动
  public move = {} as any;
  // 位置
  public position = { left: 0, top: 0 } as any;
  // 初始位置
  public positionOld = {} as any;
  public startTime = 0;
  public endTime = 0;
  get dragBall() {
    return this.$refs.dragBall as any;
  }
  beforeRouteUpdate(){
    
  }
  public created() {
    if (this.$route.path === "/my") {
      this.isRouteMy = true;
    }
  }
  public touchstart(e: any) {
    if (!this.canDrag) {
      this.startTime = e.timeStamp;
      this.positionOld = this.getPosition(this.dragBall);
      this.position = { ...this.positionOld };
      this.inset = {
        left: e.targetTouches[0].clientX - this.positionOld.left,
        top: e.targetTouches[0].clientY - this.positionOld.top,
      };
      this.canDrag = true;
    } else {
      this.$router.push({ path: this.isRouteMy ? "/login" : "/edit" });
    }
  }
  public touchmove(e: any) {
    if (this.canDrag) {
      let left = e.targetTouches[0].clientX - this.inset.left;
      let top = e.targetTouches[0].clientY - this.inset.top;
      if (left < 0) {
        left = 0;
      } else if (left > window.innerWidth - this.dragBall.offsetWidth) {
        left = window.innerWidth - this.dragBall.offsetWidth;
      }
      if (top < 0) {
        top = 0;
      } else if (top > window.innerHeight - this.dragBall.offsetHeight) {
        top = window.innerHeight - this.dragBall.offsetHeight;
      }
      this.dragBall.style.left = left + "px";
      this.dragBall.style.top = top + "px";
      this.move = {
        x: left - this.positionOld.left,
        y: top - this.positionOld.top,
      };
      this.position = { left, top };
    }
  }
  public touchend(e: any) {
    if (this.canDrag) {
      this.endTime = e.timeStamp;
      if (
        this.endTime - this.startTime > 400 ||
        Math.abs(this.move.x) > 2 ||
        Math.abs(this.move.y) > 2
      ) {
        // 非单击事件
        if (
          this.position.left + this.dragBall.offsetWidth / 2 >
          window.innerWidth / 2
        ) {
          this.dragBall.style.left =
            window.innerWidth - this.dragBall.offsetWidth + "px";
        } else {
          this.dragBall.style.left = 0 + "px";
        }
      } else {
        this.$emit("click");
      }
      this.inset = {};
      this.move = {};
      this.position = {};
      this.canDrag = false;
    }
  }
  public getPosition(source: any) {
    let left = source.offsetLeft; //获取元素相对于其父元素的left值var left
    let top = source.offsetTop;
    let current = source.offsetParent; // 取得元素的offsetParent // 一直循环直到根元素
    while (current != null) {
      left += current.offsetLeft;
      top += current.offsetTop;
      current = current.offsetParent;
    }
    return {
      left: left,
      top: top,
    };
  }
}
</script>

<style lang="scss" scoped>
.drag-ball {
  position: absolute;
  z-index: 10003;
  right: 19px;
  bottom: 19px;
  top: 80%;
  width: 60px;
  height: 60px;
  background: deepskyblue;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 0px 10px 2px skyblue;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  .drag-content {
    overflow-wrap: break-word;
    font-size: 14px;
    color: #fff;
    letter-spacing: 2px;
    font-size: 25px;
  }
}
</style>