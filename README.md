# tinyDialog.js
> a tiny dialog plugin.

## Options

- **title**
> `@String` title text

- **content**
> `@String` main content text, it can contain html element and bind events via **customEvent**

- **backdrop**
> `@Boolean` has backdrop

- **quickClose**
> `@Boolean` should click backdrop to close the dialog

- **width**
> `@Number` set the dialog's width, max is 290(px)

- **okValue**
> `@String` ok button text

- **ok**
> `@Function` click ok button event

- **cancelValue**
> `@String` cancel button text

- **cancel**
> `@Function` click cancel button event

- **customEvent**
> `@Function` the events binding the **content**

## Usage

```js

// demo1: with title, cancel and ok btn
var td = new tinyDialog({
    title: '来自我趣的温馨提醒',
    content: '已填写订单信息将被清空，是否放弃填写？',
    width: 290,
    okValue: '继续填写',
    ok: function() {
        console.log('你选择了继续填写');
        this.close();
    },
    cancelValue: '放弃',
    cancel: function() {
        this.close();
    }
});

// demo2: only ok btn, btn with custom events
var td = new tinyDialog({
    content: '<div class="code-wrapper"><input class="code-input" type="text" placeholder="图片验证码"><span class="dynamic-code">fs2c</span></div>',
    okValue: '确定',
    ok: function() {
        var value = this.$dialog.find('.code-input').val();

        if ($.trim(value)) {
            alert('验证码为:' + value);
            this.close();
        } else {
            alert('请输入正确的验证码!');
        }
    },
    customEvent: function() {
        this.$dialog.on('click', '.dynamic-code', function() {
            alert('更换动态验证码!');
        });
        this.$dialog.on('focus', '.code-input', function() {
            $(this).css({
                'border-color': '#f08300',
                'box-shadow': '1px 1px 1px #f08300'
            });
        });
        this.$dialog.on('blur', '.code-input', function() {
            $(this).css({
                'border-color': '#c7c7c7',
                'box-shadow': 'none'
            });
        });
    }
});

```

##Demo

```js

git clone https://github.com/FrendEr/tinyDialog.js
cd tinyDialog.js
open index.html

```
