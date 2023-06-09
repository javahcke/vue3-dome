import { ref } from 'vue'
import axios from 'axios'

function useURLLoader<T>(url: string) {
    const resule = ref<T | null>(null) //返回内容
    const loading = ref(true) // loading状态
    const loaded = ref(false) // 加装状态
    const error = ref(null) // 错误信息
    axios.get(url).then((rawData) => {
        loading.value = false
        loaded.value = true 	//加载成功，变成成功状态
        resule.value = rawData.data //将内容存储到变量中
    }).catch(e => {
        loading.value = false
        error.value = e //将错误信息存储到变量中
    })
    return { resule, loading, loaded, error }
}

export default useURLLoader