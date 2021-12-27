import React from 'react';

export default function Error() {
    return (
        <div className='text-center page__error'>
            <div className='card__error'>
                <h3 className='text-success'>
                    <i className='fa fa-exclamation-triangle text-danger'></i>{' '}
                    Có thể bạn biết nhưng chưa quan tâm!
                </h3>
                <hr />
                <p>
                    Thế giới gần 8 tỉ người, để gặp được nhau là một điều rất
                    khó. Vì vậy khi chúng ta có cơ hội gặp nhau thì xin bạn đừng
                    bỏ lỡ phút giây này. Và ngay lúc này đây, chúng ta đã gặp
                    được nhau.
                </p>
                <h4>
                    Cảm ơn bạn vì đã ghé thăm tôi, và cũng xin chia buồn với
                    bạn....vì....
                </h4>
                <img
                    src='/images/ERROR.png'
                    alt=''
                    width='200px'
                    height='200px'
                />
                <h3>
                    Đường dẫn bạn vừa truy cập có thể đã bị hỏng hoặc bạn không
                    được phép truy cập chúng!
                </h3>
            </div>
        </div>
    );
}
