export function readFile(f: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = function () {
      resolve(r.result as string)
    }
    r.onerror = err => reject(err)
    r.readAsDataURL(f)
  })
}
