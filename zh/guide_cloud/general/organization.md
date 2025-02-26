# 团队使用SwanLab

:::warning 

组织创建已全面开放，每个组织上限为15人。

:::

## 创建组织

在主页的左上方，点击“创建组织”按钮，填写组织名，即可完成组织创建。

<div align="center">
<img src="/assets/organization-create.jpg" width="400">
</div>

## 将实验上传到组织空间

在默认情况下，你的项目会被上传到个人空间下。  
想要上传到组织空间下，则将`swanlab.init`的`workspace`参数设置为组织的组织名（不是组织昵称）即可。

```python
import swanlab

swanlab.init(
    workspace="[组织名username]"
)
```

如果组织里的多个人想要在一个项目下协作，则只需要将`swanlab.init`的`project`参数设置为同一个即可。