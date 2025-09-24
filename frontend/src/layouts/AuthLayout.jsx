export default function AuthLayout ({ title, children, footer }) {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-lg p-8'>
          <h1 className='text-2xl font-bold text-gray-900 mb-6 text-center'>{title}</h1>
          {children}
        </div>
        {footer ? <div className='mt-4 text-center text-sm text-gray-600'>{footer}</div> : null}
      </div>
    </div>
  )
}
